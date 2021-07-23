const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const port = 8080
const mongoose = require("mongoose")
const cors = require("cors")
const socketio = require("socket.io")
const { Server } = require("socket.io")
const Chat = require("./schemas/chats")
//const io = new Server(server)


const io = new Server(server, {
    cors: { origin: "*" }
});

app.use(cors())

app.get('/potato', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.use(cors())
// routers
const postsRouter = require("./routers/posts")
const testsRouter = require("./routers/tests")
const indexRouter = require("./routers/index")
const commentsRouter = require("./routers/comments")
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const connect = require("./schemas")
connect()

app.use('/api/posts', postsRouter)
app.use('/test', testsRouter)
const carsRouter = require("./routers/car")
app.use('/cars', carsRouter)
app.use('/api/', indexRouter)
app.use('/api/comments', commentsRouter)
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

server.listen(3000, () => { console.log('listening on *:3000')})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected')
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg)
        io.emit('chat message', msg)
    })
    socket.broadcast.emit('hi')
})

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets
