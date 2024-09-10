const express = require("express");
const router = require("./Routes/index.js");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors({
    origin:
        'http://localhost:5173'
    ,
    methods: ["GET", "POST", "PUT", "DELETE"]
    ,
    credentials: true
}));


server.use("/", router);

module.exports = server;
