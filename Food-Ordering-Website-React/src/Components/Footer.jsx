import React from 'react';
import '../Static/blog.css'; // Import blog.css explicitly

function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-inner-1">
          <span>Subscribe to our newsletter for the latest updates and exclusive offers!</span>
        </div>
        <div className="footer-inner-2">
          <div className="mail">
            <input type="text" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
      <div className="footer-1">
        <div className="first">
          <img src="images/log.svg" alt="Logo" />
          <p>
            We offer a diverse culinary experience with quality ingredients and
            authentic recipes. Join us for a memorable dining experience!
          </p>
          <div className="media-logos">
            <div className="media-logo">
              <i className="fab fa-facebook-f"></i>
            </div>
            <div className="media-logo">
              <i className="fab fa-twitter"></i>
            </div>
            <div className="media-logo">
              <i className="fab fa-instagram"></i>
            </div>
            <div className="media-logo">
              <i className="fab fa-pinterest-p"></i>
            </div>
          </div>
        </div>
        <div className="second">
          <div>
            <span>O</span>ur Links
          </div>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Restaurants</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="second">
          <div>
            <span>O</span>ur Services
          </div>
          <ul>
            <li>Online Ordering</li>
            <li>Table Reservations</li>
            <li>Catering</li>
            <li>Gift Cards</li>
            <li>Delivery</li>
          </ul>
        </div>
        <div className="second">
          <div>
            <span>H</span>elp
          </div>
          <ul>
            <li>FAQs</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Payment Methods</li>
            <li>Support</li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2023 Foodies. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
