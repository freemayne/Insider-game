import express from "express";
import "dotenv/config";

const server = express();

const PORT = process.env.PORT || 5000;


server.use(express.json)



server.listen(PORT, () => console.log(`Server started on ${PORT}`))