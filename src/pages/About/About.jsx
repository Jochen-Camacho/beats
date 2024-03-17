import React from "react";
import "./About.css";
import aboutUsImg from "../../assests/images/aboutPageImage.jpg";

export const About = () => {
  return (
    <div className="pageCont">
      <div className="innerPageCont">
        <div className="pageHeader">
          <h2 className="pageHead">About</h2>
        </div>
        <div className="aboutPageCont">
          <div className="aboutPageContent">
            Welcome to Beats, your premier destination for original and
            high-quality beats. Founded by passionate music producers and sound
            engineers, we embarked on this journey with a simple vision: to
            create a vibrant community where talented beatmakers and artists
            converge to inspire and be inspired.
            <br></br>
            <br></br>
            <h3 className="aboutUsSubHead">Mission</h3>
            Our Mission At Beats, we believe in the power of music to connect
            souls and unleash creativity. Our mission is to democratize music
            production, making it accessible to artists of all levels, from
            aspiring lyricists to established musicians. We aim to simplify the
            process of finding the perfect beat, enabling artists to focus on
            what they do best—creating unforgettable music.
          </div>
          <div className="aboutPageImage">
            <img
              src={aboutUsImg}
              alt="About Us Page -- Collage of Cover Images"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};
