import GameConfig from "./components/GameConfig";
import GameLobby from "./components/GameLobby";
import { Route, Routes } from "react-router-dom";
import React from "react";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/game" element={<GameConfig />} />
        <Route path="/:username/game/:id" element={<GameLobby/>} />
      </Routes>
    </div>
  );
}

export default App;
