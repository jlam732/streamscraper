import React, { useState, useEffect } from "react";
import api from "streamscraper/api";

import Stream from "./Stream/Stream";

const Game = ({ name, url }) => {
  const [open, setOpen] = useState(false);
  const [streams, setStreams] = useState({});

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
        <p>this is open</p>
        <ul>
          {Object.keys(streams).map((title, index) => (
            <Stream key={index} name={title} url={streams[title]} />
          ))}
        </ul>
      </div>
    </li>
  );
};

export default Game;
