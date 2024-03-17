import React from "react";
import "./Home.css";
import { Hero } from "../../components/Hero/Hero";
import { TrendingTracks } from "../../components/TrendingTracks/TrendingTracks";

export default function Home({ tracks }) {
  return (
    <div>
      <Hero tracks={tracks}></Hero>
      <TrendingTracks tracks={tracks}></TrendingTracks>
    </div>
  );
}
