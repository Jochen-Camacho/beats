import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import "./PaymentSuccess.css";

export const PaymentSuccess = () => {
  return (
    <div className="pageCont">
      <div className="innerPageCont paySuccessCont">
        <div className="paySuccess">
          <h1>Pucrhase Complete</h1>
          <div className="checkMarkCont">
            <IoMdCheckmarkCircleOutline />
          </div>
        </div>
      </div>
    </div>
  );
};
