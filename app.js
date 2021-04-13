const cv = require('opencv4nodejs');

const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const camera = new cv.VideoCapture(0); 
const FPS = 30;


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

setInterval(() => {
    var frame = camera.read();
    frame = frame.flip(1);

    const image = cv.imencode('.jpg', frame).toString('base64');
    io.emit('image', image);
}, 1000 / FPS)


server.listen(3000);


function 

