const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server);

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/public")
})

io.on('connection', (socket)=>{
    console.log('A user Connected');

    socket.on('disconnect', ()=>{
        console.log('User disconnected')
    })

    socket.on('cell touched', (cell)=>{
        console.log(`Cell touched is ${cell}`)
    })
})

server.listen(3000, ()=>{
    console.log("Server Connected to Port 3000")
})