const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const studentRouters = require("./routes/sudentRouters");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/students", studentRouters(io));

io.on("connection", (socket) =>{
    console.log("Client connected:", socket.id);
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));