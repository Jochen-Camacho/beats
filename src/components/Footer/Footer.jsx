import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { CiCircleCheck } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { useWindowDimensions } from "../../utilities/useWindowDim";

export const Footer = () => {
  const windowDimensions = useWindowDimensions();
  const [isClicked, setIsClicked] = React.useState({
    beats: false,
    support: false,
    press: false,
    socials: false,
  });

  const footerSections = [
    ["beats", ["About Us", "Career", "Merch", "Blog"]],
    ["support", ["Pricing", "Start Selling", "Sign up", "Login", "Help desk"]],
    ["press", ["Billboard", "Vulter", "Forbes", "Genius"]],
    ["socials", ["YouTube", "Instagram", "Facebook", "Twitter"]],
  ];

  React.useEffect(() => {
    const isResized = windowDimensions.width > 900;
    setIsClicked({
      beats: isResized,
      support: isResized,
      press: isResized,
      socials: isResized,
    });
  }, [windowDimensions]);

  function handleTitleClick(section) {
    console.log(windowDimensions.width);

    if (windowDimensions.width <= 900) {
      setIsClicked((prevStates) => ({
        ...prevStates,
        [section]: !prevStates[section],
      }));
    }
  }

  const displayFotterSections = footerSections.map((section, index) => (
    <div className="footerSection" key={index}>
      <h2 className="footTitle" onClick={() => handleTitleClick(section[0])}>
        {section[0].charAt(0).toUpperCase() + section[0].slice(1)}
        <span className="right">
          <IoIosArrowDown
            className={`"arrowDown" ${isClicked[section[0]] ? "rotated" : ""}`}
          ></IoIosArrowDown>
        </span>
      </h2>

      {isClicked[section[0]] && (
        <div className="footerBody">
          {section[1].map((link, index) => (
            <Link to="/" target="_blank" key={index}>
              {link}
            </Link>
          ))}
        </div>
      )}
    </div>
  ));

  return (
    <footer>
      <div className="footerTop">
        <div className="footerLogo">
          Brought To You by the Beats Team
          <CiCircleCheck className="check"></CiCircleCheck>
        </div>
        {displayFotterSections}
      </div>
      <hr></hr>
      <div className="footerBottom">
        <p>© 2024 Beats, Inc</p>
        <Link to="/" target="_blank">
          Terms & Conditions
        </Link>
        <Link to="/" target="_blank">
          Private Policy
        </Link>
        <Link to="/" target="_blank">
          Copyright
        </Link>
      </div>
    </footer>
  );
};
