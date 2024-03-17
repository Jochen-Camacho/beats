import React from "react";
import "./Track.css";
import { FaFire, FaPlay, FaPause } from "react-icons/fa";
import { TrackContext } from "../context/TrackContext/TrackContext";
import { Link } from "react-router-dom";

export const Track = ({ track }) => {
  const { setTrack, isPlaying, setIsPlaying, currentTrackId, priceFilter } =
    React.useContext(TrackContext);

  const handlePlayClick = () => {
    if (currentTrackId === track.title && isPlaying) {
      setIsPlaying(false);
    } else {
      setTrack(track);
      setIsPlaying(true);
    }
  };

  const isCurrentTrackPlaying =
    currentTrackId === track.title && isPlaying ? true : false;

  return (
    <div className="trackItemCont" on>
      <div className="trackItemImg">
        <Link to={`/tracks/${track.title}`}>
          <img src={track.cover_image} alt={track.title} />
        </Link>
        <div className="trackItemPlayCont" onClick={handlePlayClick}>
          {isCurrentTrackPlaying ? (
            <FaPause />
          ) : (
            <FaPlay className="trackItemPlay" />
          )}
        </div>
      </div>
      <Link to={`/tracks/${track.title}`} className="trackItemName">
        <p>{track.title}</p>
        {track.trending ? <FaFire className="fire" /> : ""}
      </Link>
      <Link to={`/tracks/${track.title}`}>
        <div className="trackItemMeta">
          <p className="trackArtist">{track.artist}</p>
          <p className="trackPrice">
            {track.free
              ? "Free"
              : priceFilter === "Monthly"
              ? track.price.monthly
              : track.price.exclusive}
          </p>
        </div>
      </Link>
    </div>
  );
};
