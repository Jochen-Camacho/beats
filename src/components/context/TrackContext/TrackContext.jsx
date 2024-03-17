import React from "react";

export const TrackContext = React.createContext({
  currentTrack: null,
  isPlaying: false,
  currentTrackId: null,
  priceFilter: "Monthly",
  searchQuery: "",
  cart: [],
  setCart: () => {},
  setSearchQuery: () => {},
  setPriceFilter: () => {},
  setCurrentTrackId: () => {},
  setIsPlaying: () => {},
  setTrack: () => {},
});
