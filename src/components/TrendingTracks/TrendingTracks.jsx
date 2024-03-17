import React from "react";
import "./TrendingTracks.css";
import { Track } from "../Track/Track";
import { useNavigate } from "react-router-dom";

export const TrendingTracks = ({ tracks }) => {
  const navigate = useNavigate();
  const trendingTracksDisplay = tracks
    .filter((track) => track.trending)
    .slice(0, 4)
    .map((track, index) => {
      return <Track key={index} track={track} />;
    });

  return (
    <div className="tracksCont">
      <div className="tracks">
        <div className="trackHeader">
          <h2 className="trackHead">Trending Tracks</h2>
          <p onClick={() => navigate("/tracks")}>See more</p>
        </div>
        <div className="tracksList">{trendingTracksDisplay}</div>
      </div>
    </div>
  );
};
