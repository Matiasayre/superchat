const express = require("express");
const {Server} = require("socket.io");
const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>{
    console.log("listening to port "+PORT);
})
app.use(express.static(__dirname+"/public"))
const io = new Server(server)
let messages =[];

io.on("connection",socket=>{
    console.log("cliente conectado");
    socket.emit("mensajelog",messages)
    socket.emit("welcome","bienvenido")
    socket.on("mensaje",data=>{
        messages.push(data)
      io.emit("mensajelog",messages)
    })
})
