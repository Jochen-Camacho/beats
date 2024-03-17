import React, { useState } from "react";
import { TrackContext } from "./TrackContext";

export const TrackProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [priceFilter, setPriceFilter] = useState("Monthly");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [cart, setCart] = useState([]);

  const setTrack = (track) => {
    setCurrentTrack(track);
    setCurrentTrackId(track.title);
  };

  const values = React.useMemo(
    () => ({
      currentTrack,
      isPlaying,
      currentTrackId,
      priceFilter,
      searchQuery,
      cart,
      setCart,
      setSearchQuery,
      setPriceFilter,
      setCurrentTrackId,
      setIsPlaying,
      setTrack,
    }),
    [currentTrack, isPlaying, currentTrackId, priceFilter, searchQuery, cart]
  );

  return (
    <TrackContext.Provider value={values}>{children}</TrackContext.Provider>
  );
};
