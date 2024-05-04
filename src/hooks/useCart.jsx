import React from "react";
import { TrackContext } from "../components/context/TrackContext/TrackContext";

export default function useCart() {
  const { cart, setCart } = React.useContext(TrackContext);

  const removeItemFromCart = (itemToRemove) => {
    setCart(cart.filter((item) => item !== itemToRemove));
  };

  const addItemToCart = (selectedTrack, selectedPrice) => {
    setCart((cart) => {
      return [...cart, { track: selectedTrack, price: selectedPrice }];
    });
  };

  const clear = () => {
    setCart([]);
  };

  return {
    cart,
    setCart,
    removeItemFromCart,
    addItemToCart,
    clear,
  };
}
