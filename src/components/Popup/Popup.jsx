import React from "react";
import "./Popup.css";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const Popup = ({ show, setShow, message }) => {
  const navigate = useNavigate();
  return show ? (
    <div className="popupContOuter">
      <div className="popupCont">
        <button className="closeButton" onClick={() => setShow(false)}>
          <IoCloseCircleSharp />
        </button>
        <h2 className="popupMsg">{message}</h2>
        <div className="popupBtnsCont">
          <button className="btnPrimary" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
