import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Static/header.css"; // Use the existing header.css

function RestrauntHeader({ restaurantInfo, cartcounter, data, addfun, amount, subfun }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <header>
        <div className="header d-sticky">
          <div className="d-flex justify-content-between">
            <Link to={"/"}>
              <div className="NRF">
                <img src="../images/log.svg" className="img-resp" alt="logo" />
              </div>
            </Link>
            <div className="NBD">
              <ul className="list-unstyled mb-0 d-flex NBDL">
                <li className="RB">
                  <Link to={"/"}>
                    <span>HOME</span>
                  </Link>
                </li>
                <li className="RB">
                  <Link to={"/"}>
                    <span>RESTAURANTS</span>
                  </Link>
                </li>
                <li className="RB">
                  <Link to={"/"}>
                    <span>CONTACT</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/"}>
                    <span>ABOUT</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="NSD d-flex">
              <div className="cart" onClick={() => setShow(!show)}>
                <div className="d-flex">
                  <img src="../images/cart.png" alt="cart" />
                  <div className="dot">{cartcounter}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Added tagline */}
        <div className="restaurant-tagline">
          THE ORIGIN OF TASTE
        </div>
      </header>

      {show && (
        <div className="basket-container">
          <div className="basket-header">
            <h3>Your Cart</h3>
            <span onClick={() => setShow(!show)}>x</span>
          </div>
          {data.length > 0 ? (
            data.map((item, i) => {
              return (
                <div className="basket d-flex" key={i}>
                  <div className="basket-img">
                    <img src={item.imgPath} alt="pizza" />
                  </div>
                  <div className="basket-name">
                    <p>{item.name}</p>
                    <p>$ {item.price}</p>
                    <div className="d-flex quantity">
                      <img
                        src="../images/minus.png"
                        className="add"
                        onClick={() => subfun(item)}
                        alt="minus"
                      />
                      <p>{item.quantity}</p>
                      <img
                        src="../images/plus.png"
                        className="add"
                        onClick={() => addfun(item)}
                        alt="plus"
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-text">
              <p>Your cart is empty</p>
            </div>
          )}
          {data.length > 0 && (
            <div className="checkout">
              <div className="total">
                <p>Total</p>
                <p>${amount}</p>
              </div>
              <button className="check">CHECKOUT</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default RestrauntHeader;
