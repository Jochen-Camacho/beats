import React from "react";
import { IoIosSearch } from "react-icons/io";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import "./Hero.css";
import useSearch from "../../hooks/useSearch";

export const Hero = ({ tracks }) => {
  const { searchQuery, handleSearchChange, handleSearchSubmit } = useSearch();

  return (
    <div className="heroCont">
      <Carousel className="backgroundSlides">
        {tracks.map((track, index) => {
          return (
            <Paper key={index} className="outerHero">
              <div
                className="backgroundImageSlide"
                style={{
                  backgroundImage: `linear-gradient(to bottom, 
                rgba(0,0,0,.7), 
                rgba(0,0,0,1)), 
                url(${track.cover_image}) `,
                }}
              >
                <div className="hero">
                  <div className="innerHero">
                    <div className="innerFront">
                      <h2 className="heroHeader">
                        START YOUR RISE TO FAME HERE
                      </h2>
                      <div className="heroSearch">
                        <form
                          className="heroSearchBar"
                          onSubmit={handleSearchSubmit}
                        >
                          <IoIosSearch className="heroSearchIcon" />
                          <input
                            type="text"
                            value={searchQuery}
                            placeholder="Explore Top Hits - Search Beats and Artists"
                            onChange={handleSearchChange}
                          />
                          <button className="heroButton">Search</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          );
        })}
      </Carousel>
    </div>
  );
};
