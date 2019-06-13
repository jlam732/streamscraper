import React, { useEffect, useState } from "react";
import api from "streamscraper/api";

import Game from "./Game/Game";

const GameList = ({ sport }) => {
  const [games, setGames] = useState({});

  // NOTE: componentDidMount
  useEffect(() => {
    api
      .getGameLinks(`https://www.reddit.com/r/${sport}streams`)
      .then(newGames => setGames(newGames));
  }, []);

  return (
    <div>
      <h2>This is the games container</h2>
      <ul>
        {Object.keys(games).map((key, index) => (
          <Game key={index} name={key} url={games[key]} />
        ))}
      </ul>
    </div>
  );
};

export default GameList;
