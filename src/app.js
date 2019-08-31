const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const os = require('os');
const socketIO = require('socket.io');
const cors = require('cors');
require('dotenv').config({path: '.env'});

const sequelize = require('./models').sequelize;
const authRouter = require('./routes/auth');

const app = express();
sequelize.sync();

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(express.urlencoded({extended: false, limit: '50mb'}));
app.use(cors());

app.use('/auth', authRouter);
app.get('*', (req, res, next)=> {
    res.sendFile(path.resolve(__dirname, './build/index.html'));
});

const options = {
// Homedoctor_server/ubuntu/home/root
    key : fs.readFileSync('../../../../etc/letsencrypt/live/www.homedoctor.cf/privkey.pem'),
    cert : fs.readFileSync('../../../../etc/letsencrypt/live/www.homedoctor.cf/fullchain.pem'),
};

const server = https.createServer(options, app).listen(443, ()=>{
    console.log('server listening');
});

var io = socketIO.listen(server);
io.sockets.on('connection', function(socket) {
    // convenience function to log server messages on the client
    function log() {
        var array = ['Message from server:'];
        array.push.apply(array, arguments);
        socket.emit('log', array);
    }

    socket.on('message', function(message) {
        log('Client said: ', message);
        socket.emit('message', message);
    });

    socket.on('create or join', function(room) {
        log('Received request to create or join room ' + room);

        var clientsInRoom = io.sockets.adapter.rooms[room];
        var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
        log('Room ' + room + ' now has ' + numClients + ' client(s)');

        if (numClients === 0) {
            socket.join(room);
            log('Client ID ' + socket.id + ' created room ' + room);
            socket.emit('created', room, socket.id);

        } else if (numClients === 1) {
            log('Client ID ' + socket.id + ' joined room ' + room);
            io.sockets.in(room).emit('join', room);
            socket.join(room);
            socket.emit('joined', room, socket.id);
            io.sockets.in(room).emit('ready');
        } else { // max two clients
            socket.emit('full', room);
        }
    });

    socket.on('ipaddr', function() {
        var ifaces = os.networkInterfaces();
        for (var dev in ifaces) {
            ifaces[dev].forEach(function(details) {
                if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
                    socket.emit('ipaddr', details.address);
                }
            });
        }
    });

    socket.on('bye', function(){
        console.log('received bye');
    });

    //matching system
    socket.on('', function () {
        console.log();
    });
});

