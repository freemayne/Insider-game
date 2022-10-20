import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";

const GameLobby = () => {
  const [lobby, setLobby] = useState([]);
  const [lobbyUsers, setLobbyUsers] = useState([]);
  const [user, setUser] = useState({});
  const [showButton, setShowButton] = useState(false);
  const [role, setRole] = useState(false);

  const { id, username } = useParams();

  useEffect(() => {
    const fetchData = async (id) => {
      const result = await fetch(`http://localhost:5000/game/${id}`);
      const jsonResult = await result.json();
      if (JSON.stringify(jsonResult) !== JSON.stringify(lobby)) {
        setLobby(jsonResult);
        setLobbyUsers(jsonResult.user);
      }
    };
    fetchData(id);
  }, [lobbyUsers]);

  useEffect(() => {
    const fetchUserData = async (username) => {
      const result = await fetch(`http://localhost:5000/user/${username}`);
      const jsonResult = await result.json();
      setUser(jsonResult);
    };
    fetchUserData(username);
  }, []);

  console.log(lobby);
  console.log(lobbyUsers);
  console.log(user);
  

  const modifyRoleList = () => {
    let roles = ["Master", "Insider"];

    for (let index = 2; index < lobbyUsers.length; index++) {
      roles.push("Commoner");
    }
    console.log(roles);
    lobbyUsers.forEach((user) => {
      let index = Math.floor(Math.random() * roles.length);
      console.log(index);
      user.role = roles[index];
      roles.splice(index, 1);

      console.log(roles);
    });
  };
  /*   const resetRoles = () => {
    lobbyUsers.forEach((user) => {
      user.role = "";
    });
  }; */

  const showRole = () => {
    if (lobby.gameStart === true) {
      let u = lobbyUsers.find((user) => user.username === username);
      user.role = u.role;
    }

    return role ? `your role is ${user.role}` : null;
  };

  const handleStartGame = async () => {
    const result = await fetch(`http://localhost:5000/game/${id}/start`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    if (result.status === 200) {
      console.log("Game Started");
    }
    modifyRoleList();
    setRole(true);
    setShowButton(true);
  };

  const handleEndGame = async () => {
    const result = await fetch(`http://localhost:5000/game/${id}/end`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    if (result.status === 200) {
      console.log("Game Ended");
    }
    setShowButton(false);
    setRole(false);
    /* resetRoles(); */
  };
  const IsHost = () => {
    if (lobby.host === user.username) {
      return !showButton ? startGame() : endGame();
    } else {
      return false;
    }
  };

  const startGame = () => {
    return <Button onClick={handleStartGame}> Start Game</Button>;
  };

  const endGame = () => {
    return <Button onClick={handleEndGame}> End Game</Button>;
  };

  return (
    <Box>
      <Box>
        {lobbyUsers.map((user) => (
          <Box key={user.user_id}>
            <Box>{user.username}</Box>
          </Box>
        ))}
      </Box>
      <IsHost />
      <Box>{showRole()}</Box>
    </Box>
  );
};

export default GameLobby;
