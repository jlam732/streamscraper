import React from "react";

import GameList from "./components/GameList/GameList";

const App = () => {
  return (
    <div>
      <h1>Links</h1>
      <GameList sport="mlb" />
    </div>
  );
};
export default App;
