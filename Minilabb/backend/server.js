import express from "express";
import "dotenv/config";
import userRoute from "./routes/userRoutes.js"
import gameRoute from "./routes/gameRoutes.js"

const server = express();

const PORT = process.env.PORT || 5000;


server.use(express.json())

server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
  });

server.use("/user", userRoute)
server.use("/game", gameRoute)



server.listen(PORT, () => console.log(`Server started on ${PORT}`))