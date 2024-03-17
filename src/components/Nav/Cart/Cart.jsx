import React from "react";
import { Menu, MenuItem, List, ListItem, Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";

export const Cart = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { cart, removeItemFromCart } = useCart();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log("Closed");
    setAnchorEl(null);
  };

  return (
    <div className="navCartCont">
      <div className="cartIconsCont" onClick={handleClick}>
        <Badge className="navCart" badgeContent={cart.length} color="primary">
          <FaShoppingCart className="cartIcon" />
        </Badge>
        <IoIosArrowDown />
      </div>

      <Menu
        className="cartMenu"
        color="primary"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            backgroundColor: "var(--lightBlack)",
            color: "white",
            border: "2px solid var(--L1Grey)",
            width: "400px",
            marginTop: "30px",
            ...(window.innerWidth < 500
              ? { marginLeft: "10px" }
              : { marginLeft: "40px" }),
          },
        }}
      >
        {cart[0] ? (
          <>
            <List
              style={{
                width: "100%",
                maxHeight: "400px",
                overflow: "auto",
                backgroundColor: "var(--lightBlack)",
                scrollbarWidth: "thin",
                scrollbarColor: "darkgrey black",
              }}
            >
              {cart.map((item, index) => {
                return (
                  <ListItem key={index} style={{ width: "100%" }}>
                    <div className="cartItemCont">
                      <img
                        src={item.track.cover_image}
                        alt={item.track.title}
                      />
                      <div className="cartItemContent">
                        <div className="cartItemMeta">
                          <p>{item.track.title} </p>
                          <p>{item.track.artist}</p>
                        </div>
                        <div className="priceCont">
                          {item.price === "Monthly"
                            ? item.track.price.monthly
                            : item.track.price.exclusive}
                        </div>
                        <div
                          className="cartXIcon"
                          onClick={() => removeItemFromCart(item)}
                        >
                          <IoClose />
                        </div>
                      </div>
                    </div>
                  </ListItem>
                );
              })}
            </List>
            <MenuItem
              onClick={() => {
                navigate("/payment");
              }}
              style={{
                paddingTop: "20px",
              }}
            >
              <button className="btnPrimary checkout">CheckOut</button>
            </MenuItem>
          </>
        ) : (
          <h2 className="noItems">No Items In Cart.</h2>
        )}
      </Menu>
    </div>
  );
};
