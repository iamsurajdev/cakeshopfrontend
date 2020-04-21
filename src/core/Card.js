import React, { useState, useEffect } from "react";
import ImageApi from "./api/ImageApi";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./api/CartHelper";
import { isAuthenticated } from "../auth/api/Authentication";
import Cstyle from "./allstyles/card.module.css";
const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescription = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "DEFAULT";

  const addToCart = () => {
    if (isAuthenticated()) {
      addItemToCart(product, () => setRedirect(true));
    } else {
      alert("you are not login");
    }
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button onClick={addToCart} className={Cstyle.addButton}>
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className={Cstyle.removeButton}
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div className={Cstyle.card}>
      <div className={Cstyle.cardTitle}>{cartTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageApi product={product} />
        <p className={Cstyle.cartDescription}>{cartDescription}</p>
        <p className="btn btn-success rounded  btn-sm px-4">
          Price: $ {cartPrice}
        </p>
        <div className="row">
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
