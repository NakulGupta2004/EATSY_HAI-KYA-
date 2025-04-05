import React from "react";
import '../Static/index.css';
function HomeHeader() {
  return (
    <header>
      <nav>
        <div className="responsive-tab">
          <div className="head-1">
            <img
              className="more"
              style={{height: "20px", filter: "none"}}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwbIE5X5cJibmK9QAaLJAbT2HrBTzSvNqvZw&s"
              alt=""
            />
          </div>
          <div className="nav-left-responsive">
            <div id="side-menu">
              <div className="menu-header">
                <span>Menu</span>
                <button id="close-btn">✖</button>
              </div>
              <ul className="menu-list">
                <a href="/">
                  <li>Home</li>
                </a>
                <li>Order</li>
                <a href="Blogs"><li>Blog</li></a>
                <li>Pages</li>
                <a href="Contact">
                  <li>Contact</li>
                </a>
              </ul>
            </div>
          </div>
        </div>
        <div className="nav-left">
          <img className="invert" src="images/logo.png" alt="" />
          <button>
            <span className="material-symbols-outlined"> location_on </span>Location
          </button>
        </div>
        <div className="nav-center">
          <ul>
            <li className="invert">
              <a href="/">Home</a>
            </li>
            <li className="invert">
              <a href="">
                Order
                <span className="material-symbols-outlined">
                  keyboard_arrow_down
                </span>
              </a>
            </li>
            <li className="invert">
              <a href="Blogs">
                Blogs
                <span className="material-symbols-outlined">
                  keyboard_arrow_down
                </span>
              </a>
            </li>
            <li className="invert">
              <a href="">
                Pages
                <span className="material-symbols-outlined">
                  keyboard_arrow_down
                </span>
              </a>
            </li>
            <li className="invert">
              <a href="Contact">
                Contact
                <span className="material-symbols-outlined">
                  keyboard_arrow_down
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div className="nav-right">
          <span className="material-symbols-outlined" id="dark_color">
            shopping_cart
          </span>
          <a href="login">
            <div className="account">
              <img src="images/Mark.png" alt="" />
              <div className="account-name">
                <div>Hi Mark Jecno</div>
                <div className="dark_color">My Account</div>
              </div>
            </div>
          </a>
        </div>
      </nav>
      <div className="head0">
        <div className="bg-image">
          <img className="back-image" src="images/home-bg2.png" alt="" />
          <div className="bg-image-details">
            <div className="left-details">
              <div className="first-delievery">50% off on First delivery</div>
              <div className="quote">
                Made with love,
                <div>Savored with interest.</div>
              </div>
              <div className="browse">
                Browse out top categories here to discover different food
                cuision.
              </div>
              <div className="restaurant-search">
                <input type="text" placeholder="Search for Restaurant" />
                <span className="material-symbols-outlined"> search </span>
              </div>
              <button className="search">SEARCH</button>
            </div>
            <div className="right-details">
              <div>
                <img className="image-1" src="images/food1.png" alt="" />
                <img className="image-2" src="images/food3.png" alt="" />
              </div>
              <div>
                <img className="mobile-img" src="images/mobile.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="facilities">
          <div className="facility">
            <img src="images/routing.svg" alt="" />
            <div className="facility-detail">
              <div className="dark_color">Wide Map</div>
              <div>Wide Range of Map, Order from anywhere</div>
            </div>
          </div>
          <div className="facility">
            <img src="images/3d-rotate.svg" alt="" />
            <div className="facility-detail">
              <div className="dark_color">Easiest Order</div>
              <div>
                Easy and hussle free order online
                process&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;~
              </div>
            </div>
          </div>
          <div className="facility">
            <img src="images/truck.svg" alt="" />
            <div className="facility-detail">
              <div className="dark_color">Most Delivery</div>
              <div>we ensure your food is delivered swiftly</div>
            </div>
          </div>
          <div className="facility">
            <img src="images/credit-card.svg" alt="" height="50em" />
            <div className="facility-detail">
              <div className="dark_color">Various Payment</div>
              <div>Various payment options to make order seamless</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;
