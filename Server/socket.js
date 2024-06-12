const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server,{
    cors:{
        origin :["http://localhost:3000"]
    }
});


const PORT = 5000;


//クライアントと通信
io.on("connection" ,(socket) => {
    console.log("クライアントと接続しました");

    socket.on ("value",value => {
        console.log(value)
        io.emit("value",value);
    })
    //クライアントから受信
    socket.on ("user",user => {
        console.log(user)
        io.emit("user",user);
    })

    socket.on("connection" ,() => {
        console.log("クライアントとの接続が切れました");
    })
});


server.listen(PORT,()=> console.log(`Listening to port ${PORT}`))

