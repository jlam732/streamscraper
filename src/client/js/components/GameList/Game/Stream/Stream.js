import React, { useState, useEffect } from "react";
import api from "streamscraper/api";

const renderVideo = video => {
  if (video === null) return <p>Loading...</p>;
  if (Object.keys(video).length === 0) {
    return <p>No video found</p>;
  }
  return (
    <div>
      <p>Insert video here</p>
    </div>
  );
};

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
        <a href={url} style={{ marginLeft: "10px" }}>
          <span>Open</span>
        </a>
      </div>
      <div style={{ display: open ? "block" : "none" }}>
        {renderVideo(video)}
      </div>
    </li>
  );
};

export default Stream;
