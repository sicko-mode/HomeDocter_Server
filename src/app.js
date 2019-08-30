const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false, limit: '50mb'}));

const options = {
// Homedoctor_server/ubuntu/home/root
    key : fs.readFileSync('../../../../etc/letsencrypt/live/www.homedoctor.cf/privkey.pem'),
    cert : fs.readFileSync('../../../../etc/letsencrypt/live/www.homedoctor.cf/fullchain.pem'),
};

https.createServer(options, app).listen(443, ()=>{
    console.log('server listening');
});
