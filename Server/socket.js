const express = require("express");
const app = express();

/////追加
const path = require("path");
//==================


const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server,{
    cors:{
        origin: "https://tictoctoe-1.onrender.com/",  // デプロイしたアプリのドメイン
        methods: ["GET", "POST"]
    }
});


// const PORT = 5000;
const port = process.env.PORT || 3000;

// console.log(`Using port: ${PORT}`);  // 追加: 環境変数の確認


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
    
    socket.on("reset", user => {
        console.log("リセットイベント受信");
        io.emit("reset", user);
    })
    socket.on("disconnect" ,() => {
        console.log("クライアントとの接続が切れました");
    })
});


//追加
if (process.env.NODE_ENV === "production") {
    app.get("*", (req, res) => {
      const indexFile = path.join(__dirname, "dist", "index.html");
      return res.sendFile(indexFile);
    });
  }
//==========================--

server.listen(port,()=> console.log(`Listening to port aaaaaaaaaaaaaaaaaaaaaaaaa`))

