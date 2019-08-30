const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false, limit: '50mb'}));

app.listen(5000, ()=>{
    console.log('server is listening on 5000 port.');
});
