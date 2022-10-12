import express from "express";

const server = express();
const PORT = 3001 || 5000;

server.use(express.json)

server.listen(PORT, () => console.log(`Server started on ${PORT}`))