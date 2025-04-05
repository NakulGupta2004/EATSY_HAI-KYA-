import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Change import path to an existing CSS file
import "../Static/R1.css";

function RestrauntHeader({ restaurantInfo, cartcounter, data, amount, addfun, subfun }) {
  const [cartVisible, setCartVisible] = useState(false);

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  // Close cart when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartVisible && !event.target.closest('.cart-container') && !event.target.closest('.cart-icon')) {
        setCartVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartVisible]);

  return (
    <div className="header-container">
      <header>
        <div className="head-1">
          <div className="head-logo">
            <Link to="/">
              <img src="images/log.svg" alt="Logo" />
            </Link>
            {restaurantInfo ? (
              <div className="restaurant-header-info">
                <h1>{restaurantInfo.name}</h1>
                <div className="restaurant-header-details">
                  <span className="cuisine">{restaurantInfo.cuisine}</span>
                  <span className="location">{restaurantInfo.location}</span>
                </div>
              </div>
            ) : (
              <div className="restaurant-header-info">
                <h1>Restaurant Menu</h1>
              </div>
            )}
          </div>

          <div className="head-nav">
            <ul>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/restaurants">
                <li>Restaurants</li>
              </Link>
              <Link to="/about">
                <li>About</li>
              </Link>
              <Link to="/blogs">
                <li>Blog</li>
              </Link>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="head-profile flex">
            <div className="line"></div>
            <div className="head-me flex">
              <div className="img">
                <img src="/images/user.png" alt="User" />
              </div>
              <div className="head-me-content">
                <h5>Furion</h5>
                <p>My Account</p>
              </div>
            </div>
            <div className="line"></div>
            <div className="cart-icon" onClick={toggleCart}>
              <img src="/images/cart.png" alt="Cart" />
              {cartcounter > 0 && (
                <span className="cart-counter">{cartcounter}</span>
              )}
            </div>
          </div>

          {/* Cart dropdown */}
          {cartVisible && (
            <div className="cart-dropdown">
              <div className="cart-header">
                <h3>Your Cart ({cartcounter} items)</h3>
                <button onClick={toggleCart}>Close</button>
              </div>
              <div className="cart-items">
                {data.length === 0 ? (
                  <p className="empty-cart">Your cart is empty</p>
                ) : (
                  data.map((item, index) => (
                    <div key={index} className="cart-item">
                      <img src={item.imgPath} alt={item.name} />
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <div className="cart-item-price">${item.price}</div>
                        <div className="cart-item-quantity">
                          <button onClick={() => subfun(item)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => addfun(item)}>+</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {data.length > 0 && (
                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total:</span>
                    <span>${amount}</span>
                  </div>
                  <button className="checkout-btn">Proceed to Checkout</button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="responsive-head">
          <div className="head-1">
            <img
              className="more"
              src="https://cdn-icons-png.flaticon.com/128/6015/6015685.png"
              alt=""
              onClick={() => document.getElementById('side-menu').style.left = '0'}
            />
            <div className="NRF">
              <div className="head-logo">
                <img src="images/log.svg" />
              </div>
            </div>
            <div className="cart-icon" onClick={toggleCart}>
              <img src="/images/cart.png" alt="Cart" />
              {cartcounter > 0 && (
                <span className="cart-counter">{cartcounter}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div id="side-menu">
        <div className="menu-header">
          <span>Menu</span>
          <button id="close-btn" onClick={() => document.getElementById('side-menu').style.left = '-100%'}>
            &times;
          </button>
        </div>
        <ul className="menu-list">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/restaurants">
            <li>Restaurants</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/blogs">
            <li>Blog</li>
          </Link>
          <Link to="/contact">
            <li>Contact</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default RestrauntHeader;
