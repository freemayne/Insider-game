import express from "express";
import "dotenv/config";
import userRoute from "./routes/userRoutes.js"
import gameRoute from "./routes/gameRoutes.js"
import cors from 'cors';

const server = express();

const PORT = process.env.PORT || 5000;


server.use(express.json())

const corsConfig = {
  origin: "http://localhost:3000"
}
server.use(cors(corsConfig))

server.use("/user", userRoute)
server.use("/game", gameRoute)



server.listen(PORT, () => console.log(`Server started on ${PORT}`))