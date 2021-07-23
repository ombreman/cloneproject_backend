
const express = require("express")
const app = express()

const http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const connect = require("./schemas");
connect();

let user = []

io.on('connection', function (socket) {
    socket.on('potato', function (data) {
        console.log(data)
        io.emit('tomato', data)
    })
});


var chat1 = io.of('/lobby');
chat1.on('connection', function (socket) {

    socket.on('user', function (data) {
        console.log(data, "fuck here")
    })

    var roomNo = '';

    socket.on('requestJoin', function (data) {
        socket.join(data);
        roomNo = data;
    });

    socket.on('who', function (data) {
        chat1.to(roomNo).emit('a', data);
    });
    socket.on('chat', function (data) {
        console.log(data);
        chat1.to(roomNo).emit('e', data);
    });
});


app.get('/chat', function (요청, 응답) {
    응답.render('chat.ejs')
});
http.listen(8080, function () {
    console.log('listening on 8080')
});

