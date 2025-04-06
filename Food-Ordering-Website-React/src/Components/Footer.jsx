import React from 'react';
import { Link } from 'react-router-dom';
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
          <img src="/logo.png" alt="Eatsy Logo" />
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
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/restaurants">Restaurants</Link></li>
            <li><Link to="/blog">Blog</Link></li> {/* Updated path to /blog (singular) if that's your route */}
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="second">
          <div>
            <span>O</span>ur Services
          </div>
          <ul>
            <li><Link to="/order">Online Ordering</Link></li>
            <li><Link to="/reservations">Table Reservations</Link></li>
            <li><Link to="/catering">Catering</Link></li>
            <li><Link to="/gift-cards">Gift Cards</Link></li>
            <li><Link to="/delivery">Delivery</Link></li>
          </ul>
        </div>
        <div className="second">
          <div>
            <span>H</span>elp
          </div>
          <ul>
            <li><Link to="/faq">FAQs</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/payment">Payment Methods</Link></li>
            <li><Link to="/support">Support</Link></li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} Foodies. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
