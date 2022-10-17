import { useState } from "react"
import {Box, Button, Input} from "@mui/material"



const GameStart = () => {

    const [username, setUsername] = useState("") 
    const [gameId, setGameId] = useState("")

    const handleChangeUsername = event => {
      setUsername(event.target.value);
      console.log(event.target.value);
    }
  
    const handleChangeGameId = event => {
      setGameId(event.target.value);
      console.log(event.target.value);
    }
    
    const handleSave = async (event) => {
        const data = {
            username: username
        }

        await fetch("http://localhost:5000/user",
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
    }
    const handleHostGame = async () => {
      const data = {
        isActive: true,
      };
  
      const result = await fetch(
        `http://localhost:5000/user/${username}/create`,
        {
          method: "PATCH",
          headers: { "Content-type": "application/join" },
          body: JSON.stringify(data)
        }
      );
      console.log(result)
    };
    const handleJoinGame = async () => {
    
  
      const result = await fetch(
        `http://localhost:5000/user/${username}/join/${gameId}`,
        {
          method: "PATCH",
          headers: { "Content-type": "application/join" }
        
        }
      );
      console.log(result)
    };
  

  return (
  <Box>
   
    <Input 
    type="text"
    name="message"
    value={username}
    onChange={ handleChangeUsername}
    />
    <Button onClick={handleSave}>Add</Button>
    <Input 
    type="text"
    placeholder="input Game Id"
    name="message"
    value={gameId}
    onChange={ handleChangeGameId}
    />
    <Button onClick={handleHostGame}>craete</Button>
    <Button onClick={handleJoinGame}>Join</Button>
    
  </Box>

  )
}


export default GameStart
