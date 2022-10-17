import GameStart from "./components/GameStart";
import { Route, Routes } from "react-router-dom";
import React from "react";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/game" element={<GameStart />} />
      </Routes>
    </div>
  );
}

export default App;
