import React, { useEffect, useState } from "react";
import api from "streamscraper/api";

import Game from "./Game/Game";

const renderGameList = games => {
  if (games === null) return <p>Loading...</p>;
  if (Object.keys(games).length === 0) {
    return <p>No games posted</p>;
  }
  return (
    <ul>
      {Object.keys(games).map((key, index) => (
        <Game key={index} name={key} url={games[key]} />
      ))}
    </ul>
  );
};

const GameList = ({ sport }) => {
  const [games, setGames] = useState(null);
  const [open, setOpen] = useState(false);

  // NOTE: componentDidMount
  useEffect(() => {
    if (open) {
      api
        .getGameLinks(`https://www.reddit.com/r/${sport}streams`)
        .then(newGames => setGames(newGames));
    }
  }, [open]);

  return (
    <div>
      <div style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}>
        <h2>{`${sport.toUpperCase()} Games`}</h2>
      </div>
      <div style={{ display: open ? "block" : "none" }}>
        {renderGameList(games)}
      </div>
    </div>
  );
};

export default GameList;
