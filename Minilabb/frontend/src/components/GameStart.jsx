import { useState } from "react";
import { Box, Button, Input } from "@mui/material";
import React from "react";

const GameStart = () => {
  const [username, setUsername] = useState("");

  const handleChange = (event) => {
    setUsername(event.target.value);
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

  return (
    <Box>
      <Input
        type="text"
        name="message"
        value={username}
        onChange={handleChange}
      />
      <Button onClick={handleSave}>Add</Button>
    </Box>
  );
};

export default GameStart;
