import React, { useEffect, useState } from "react";
import api from "streamscraper/api";

const renderGameLink = (key, link, name) => {
  return (
    <li key={key}>
      <a href={link}>{name}</a>
    </li>
  );
};

const GamesContainer = ({ sport }) => {
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
        {Object.keys(games).map((key, index) =>
          renderGameLink(index, games[key], key)
        )}
      </ul>
    </div>
  );
};

export default GamesContainer;
