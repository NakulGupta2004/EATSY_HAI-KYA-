import React from "react";
import '../Static/index.css';
function RstHeader() {
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

    </header>
  );
}

export default RstHeader;
