import React from "react";
import { IoIosSearch } from "react-icons/io";
import "./Nav.css";
import { Link } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import { useAuth } from "../../hooks/useAuth";
import placeholder from "../../assests/images/placeholderUser.jpg";
import { Cart } from "./Cart/Cart";

export const Nav = () => {
  const [navbtnClicked, setNavBtnClicked] = React.useState(false);
  const { searchQuery, handleSearchChange, handleSearchSubmit } = useSearch();
  const { user } = useAuth();
  const navBarItems = [
    { name: "Home", isMobile: false, isBtn: false, linkTag: "" },
    { name: "Feed", isMobile: false, isBtn: false, linkTag: "feed" },
    { name: "Tracks", isMobile: false, isBtn: false, linkTag: "tracks" },
    { name: "About", isMobile: false, isBtn: false, linkTag: "about" },
    { name: "Login", isMobile: true, isBtn: false, linkTag: "login" },
    { name: "SELL NOW", isMobile: false, isBtn: true, linkTag: "home" },
  ];
  const handleNavBtnClick = () => {
    setNavBtnClicked(!navbtnClicked);
  };

  const displayNavBarItems = navBarItems.map((item) => {
    return (
      <li
        className={` ${
          item.isMobile
            ? window.innerWidth < 900 && !user
              ? "active"
              : "noShow"
            : ""
        } bottomNavItem`}
      >
        {item.isBtn ? (
          <button className="btnPrimary">{item.name}</button>
        ) : (
          <Link to={`/${item.linkTag}`}>{item.name}</Link>
        )}
      </li>
    );
  });

  return (
    <div className="navBar">
      <div className="nav">
        <div className="topNavCont">
          <ul className="topNav">
            <div className="topNavStart">
              <div className="logoHead">
                <div
                  className={`hamburger ${navbtnClicked ? "active" : ""} `}
                  onClick={() => handleNavBtnClick()}
                >
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                </div>
                <Link to="/">
                  <li className="navLogo">BEATS</li>
                </Link>
              </div>
              <form onSubmit={handleSearchSubmit} className="navSearchCont">
                <li className="navSearch">
                  <IoIosSearch className="searchIcon"></IoIosSearch>
                  <input
                    type="text"
                    placeholder="Find The Right Beat For You!"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </li>
              </form>
            </div>
            <div className="topNavEndOuter">
              {!user ? (
                <div className="topNavEnd">
                  <li className="topNavItem">
                    <Link to="/login">Log In</Link>
                  </li>
                  <li className="topNavItem"> | </li>
                  <li className="topNavItem">
                    <Link to="/register">Register</Link>
                  </li>
                </div>
              ) : (
                <div className="userCont">
                  <img src={placeholder} />
                  <p>{user.username}</p>
                </div>
              )}
              <Cart />
            </div>
          </ul>
        </div>
      </div>
      <div className="bottomNavCont">
        <ul className={`bottomNav ${navbtnClicked ? "active" : ""} `}>
          {displayNavBarItems}
        </ul>
      </div>
    </div>
  );
};
