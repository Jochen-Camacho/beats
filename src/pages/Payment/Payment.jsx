import React from "react";
import "./Payment.css";
import { TrackContext } from "../../components/context/TrackContext/TrackContext";
import { IoClose } from "react-icons/io5";
import { PaymentForm } from "./PaymentForm/PaymentForm";

export const Payment = () => {
  const { cart, setCart } = React.useContext(TrackContext);

  const removeItemFromCart = (itemToRemove) => {
    setCart(cart.filter((item) => item !== itemToRemove));
  };

  const calculateSubTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      const priceString =
        item.price === "Monthly"
          ? item.track.price.monthly
          : item.track.price.exclusive;
      const priceNumber = parseFloat(priceString.replace("$", ""));
      total += priceNumber;
    });
    return total;
  };

  return (
    <div className="pageCont">
      <div className="innerPageCont">
        <div className="pageHeader">
          <h2 className="pageHead">Payment</h2>
        </div>
        <div className="paymentCont">
          <div className="paymentCartItems">
            {cart.map((item, index) => {
              return (
                <div className="paymentItemCont" key={index}>
                  <img src={item.track.cover_image} alt={item.track.title} />
                  <div className="cartItemContent">
                    <div className="cartItemMeta paymentItemMeta">
                      <p>{item.track.title} </p>
                      <p>{item.track.artist}</p>
                    </div>
                    <div className="priceCont paymentPriceCont">
                      {item.price === "Monthly"
                        ? item.track.price.monthly
                        : item.track.price.exclusive}
                    </div>
                    <div
                      className="cartXIcon paymentPriceCont"
                      onClick={() => removeItemFromCart(item)}
                    >
                      <IoClose />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="paymentFormCont">
            <div className="costSummaryCont">
              <h3>Cost Summary</h3>
              <div className="costSummary">
                {cart.map((item) => {
                  return (
                    <div className="costSummaryItem">
                      <span>
                        <img src={item.track.cover_image} />
                        <p>{item.track.title}</p>
                      </span>
                      <p>
                        {item.price === "Monthly"
                          ? item.track.price.monthly
                          : item.track.price.exclusive}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="subTotalValuesCont">
                <p className="totalValues grey">
                  Subtotal: <span>${calculateSubTotal()}</span>
                </p>
                <p className="totalValues grey">
                  Service (10%):{" "}
                  <span>${(calculateSubTotal() * 0.1).toFixed(2)}</span>
                </p>
              </div>

              <p className="totalValues green">
                Total:
                <span>
                  $
                  {parseFloat(
                    calculateSubTotal() * (0.1).toFixed(2) + calculateSubTotal()
                  ).toFixed(2)}
                </span>
              </p>
            </div>
            <PaymentForm></PaymentForm>
          </div>
        </div>
      </div>
    </div>
  );
};
