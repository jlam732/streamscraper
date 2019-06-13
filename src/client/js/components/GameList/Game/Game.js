import React, { useState, useEffect } from "react";
import api from "streamscraper/api";

import Stream from "./Stream/Stream";

const renderStreamList = streams => {
  if (streams === null) return <p>Loading...</p>;
  if (Object.keys(streams).length === 0) {
    return <p>No streams posted</p>;
  }
  return (
    <ul>
      {Object.keys(streams).map((title, index) => (
        <Stream key={index} name={title} url={streams[title]} />
      ))}
    </ul>
  );
};

const Game = ({ name, url }) => {
  const [open, setOpen] = useState(false);
  const [streams, setStreams] = useState(null);

  useEffect(() => {
    if (open) {
      api.getStreamLinks(url).then(newStreams => setStreams(newStreams));
    }
  }, [open]);

  return (
    <li>
      <div style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}>
        <h4>
          {name}
          <a href={url} style={{ marginLeft: "10px" }}>
            <span>Open</span>
          </a>
        </h4>
      </div>
      <div style={{ display: open ? "block" : "none" }}>
        {renderStreamList(streams)}
      </div>
    </li>
  );
};

export default Game;
