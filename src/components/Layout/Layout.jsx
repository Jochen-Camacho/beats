import React from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "../Nav/Nav";
import { Footer } from "../Footer/Footer";
import { MusicPlayer } from "../MusicPlayer/MusicPlayer";

export const Layout = () => {
  return (
    <div className="mainContainer">
      <Nav />
      <Outlet></Outlet>
      <Footer />
      <MusicPlayer></MusicPlayer>
    </div>
  );
};
