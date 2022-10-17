import express from "express";
import "dotenv/config";
import userRoute from "./routes/userRoute.js"

const server = express();

const PORT = process.env.PORT || 5000;


server.use(express.json)

server.use("/user", userRoute)
server.use("/game", gameRoute)



server.listen(PORT, () => console.log(`Server started on ${PORT}`))