import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Box, Button, Input, Typography } from "@mui/material";
import imageInsider from "./InsiderGame.avif";

const GameConfig = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [gameId, setGameId] = useState("");

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
    console.log(event.target.value);
  };

  const handleChangeGameId = (event) => {
    setGameId(event.target.value);
    console.log(event.target.value);
  };

  const handleSave = async (event) => {
    const data = {
      username: username,
    };

    await fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  const handleHostGame = async () => {
    const data = {
      host: username,
      isActive: true,
    };

    const result = await fetch(
      `http://localhost:5000/user/${username}/create`,
      {
        method: "PATCH",
        headers: { "Content-type": "application/join" },
        body: JSON.stringify(data),
      }
    );
  };

  const handleJoinGame = async () => {
    const result = await fetch(
      `http://localhost:5000/user/${username}/join/${gameId}`,
      {
        method: "PATCH",
        headers: { "Content-type": "application/join" },
      }
    );
    if (result.status === 200) {
      console.log("true");
      console.log(result);
      navigate(`/${username}/game/${gameId}`);
    } else {
      console.log("false");
    }
  };

  return (
    <Box>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
          fontSize: 28,
          fontFamily: "Silkscreen",
        }}
      >
        Welcome to Insider
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          width: 250,
          mt: 4,
        }}
        component={"img"}
        src={imageInsider}
      ></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Input
          type="text"
          name="message"
          placeholder="Enter your username"
          value={username}
          onChange={handleChangeUsername}
          sx={{
            mr: 2,
          }}
        />
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            fontFamily: "Silkscreen",
            bgcolor: "black",
          }}
        >
          Create
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 1,
          mb: 2,
        }}
      >
        <Input
          type="text"
          placeholder="Input game id"
          name="message"
          value={gameId}
          onChange={handleChangeGameId}
          sx={{
            mr: 2,
          }}
        />
        <Button
          variant="contained"
          onClick={handleHostGame}
          sx={{
            fontFamily: "Silkscreen",
            bgcolor: "black",
          }}
        >
          Create Game
        </Button>
        <Button
          variant="contained"
          onClick={handleJoinGame}
          sx={{
            fontFamily: "Silkscreen",
            bgcolor: "red",
            color: "black",
            ml: 1,
          }}
        >
          Join Game
        </Button>
      </Box>
    </Box>
  );
};

export default GameConfig;
