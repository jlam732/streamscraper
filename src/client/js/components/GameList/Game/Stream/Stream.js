import React, { useState, useEffect } from "react";
import api from "streamscraper/api";

const Stream = ({ name, url }) => {
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState(null);

  // useEffect(() => {
  //   if (open) {
  //     api.getVideoFromStream(url).then(newVideo => setVideo(newVideo));
  //   }
  // }, [open]);

  return (
    <li style={{ margin: "0 10px" }}>
      <div style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}>
        <h4>{name}</h4>
      </div>
      <div style={{ display: open ? "block" : "none" }}>
        <p>this video is open</p>
      </div>
    </li>
  );
};

export default Stream;
