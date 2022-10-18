import React, { useEffect, useState } from 'react'
import { Box, Button,} from "@mui/material";
import { useParams } from "react-router-dom";

const GameLobby = () => {

  const [lobby, setLobby] = useState([])
  const [lobbyUsers, setLobbyUsers] = useState([])
  const [user, setUser] = useState({})


 const { id, username } = useParams();

 useEffect(() => {
 const fetchData = async(id)=>{
       
       const result =  await fetch(`http://localhost:5000/game/${id}`)
       const jsonResult = await result.json();
       setLobby(jsonResult)
       setLobbyUsers(jsonResult.user)
      }
      fetchData(id)
    }, []);

    useEffect(() => {
      const fetchUserData = async(username)=>{
            
            const result =  await fetch(`http://localhost:5000/user/${username}`)
            const jsonResult = await result.json();
            setUser(jsonResult)
           }
           fetchUserData(username)
         }, []);
    
    console.log(lobby);
    console.log(user)
    
    //under construction
    const showRole = (r)=>{

      if(lobby.gameStart === false){
        r = `your role is ${r = "Insider"}`
        return r
      }

    }
 


  

  const handleStartGame = async () => {
    
    const result =  await fetch(`http://localhost:5000/game/${id}/start`, 
    {
      method: "PATCH",
      headers: {"Content-Type": "application/json"}
    })
    if(result.status === 200){
      console.log('Game Started');
    }

        
      }

  return (
  <Box>
    <Box>
    
    {lobbyUsers.map((user)=> (
      <Box key={user.user_id}>
        <Box>{user.username}</Box>
       
        
        </Box>

    ))}
      </Box>
    <Button onClick={handleStartGame}>Start Game</Button>
    <Box>{showRole(user.role)}</Box>
  </Box>
  )
}

export default GameLobby