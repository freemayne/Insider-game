import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";

const GameLobby = () => {
  const [lobby, setLobby] = useState([]);
  const [lobbyUsers, setLobbyUsers] = useState([]);
  const [user, setUser] = useState({});
  const [showButton, setShowButton] = useState(true);
  const [role, setRole] = useState();

  const { id, username } = useParams();
  const gameUrl = `http://localhost:5000/game/`;
  const userUrl = `http://localhost:5000/user/`;

  useEffect(() => {
    setInterval(() => {
      const fetchData = async (id) => {
        const result = await fetch(`${gameUrl}${id}`);
        const jsonResult = await result.json();
        setLobby(jsonResult);
        setLobbyUsers(jsonResult.user);
        setRole(jsonResult.role);
      };
      fetchData(id);
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchUserData = async (username) => {
      const result = await fetch(`${userUrl}${username}`);
      const jsonResult = await result.json();
      setUser(jsonResult);
    };
    fetchUserData(username);
  }, []);

  const setRoleUser = async (u, r) => {
    const data = {
      role: r,
    };
    await fetch(`${userUrl}${u}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };
  const modifyRoleList = () => {
    let roles = ["Master", "Insider"];

    for (let index = 2; index < lobbyUsers.length; index++) {
      roles.push("Commoner");
    }

    lobbyUsers.forEach((user) => {
      let index = Math.floor(Math.random() * roles.length);

      user.role = roles[index];
      setRoleUser(user.username, user.role);
      roles.splice(index, 1);
    });
  };

  const resetRoles = () => {
    lobbyUsers.forEach((user) => {
      user.role = "";

      setRoleUser(user.username, user.role);
    });
  };

  const showRole = () => {
    let u = lobbyUsers.find((user) => user.username === username);
    user.role = u.role;

    return `your role is ${user.role}`;
  };

  const handleStartGame = async () => {
    const result = await fetch(`${gameUrl}${id}/start`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
  };

  const handleEndGame = async () => {
    const result = await fetch(`${gameUrl}${id}/end`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
  };

  const isHost = () => {
    if (lobby.host === user.username) {
      return true;
    } else {
      return false;
    }
  };

  const startGame = () => {
    return (
      <Button
        onClick={() => {
          handleStartGame();
          setShowButton(false);

          modifyRoleList();
        }}
      >
        {"Start Game"}
      </Button>
    );
  };

  const endGame = () => {
    return (
      <Button
        onClick={() => {
          handleEndGame();
          setShowButton(true);

          resetRoles();
        }}
      >
        {"End Game"}
      </Button>
    );
  };

  return (
    <Box>
      {isHost() ? (showButton ? startGame() : endGame()) : null}
      <Box>
        {lobbyUsers.map((user) => (
          <Box key={user.user_id}>
            <Box>{user.username}</Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          fontSize: 30,
          color: "red",
        }}
      >
        {role ? showRole() : null}
      </Box>
    </Box>
  );
};

export default GameLobby;
