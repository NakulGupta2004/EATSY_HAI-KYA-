import React from "react";

function ContactMain() {
  return (
    <main>
      <div class="main-1">
        <div class="progress-bar">
          <div class="progress"></div>
        </div>

        <div class="info-container">
          <h1>Inform us of Yourself</h1>
          <p>Contact us if you have any queries or merely want to say hi.</p>
        </div>

        <div class="contact-info">
          <div class="contact-item">
            <div class="icon">
              <span class="material-symbols-outlined">call</span>
            </div>
            <div class="text">
              <h3>Phone</h3>
              <p>(+1) 618 190 496</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="icon">
              <span class="material-symbols-outlined">mail</span>
            </div>
            <div class="text">
              <h3>Email</h3>
              <p>geweto9420@chokxus.com</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="icon">
              <span class="material-symbols-outlined">location_on</span>
            </div>
            <div class="text">
              <h3>London Office</h3>
              <p>Cruce Casa de Postas 29</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="icon">
              <span class="material-symbols-outlined">apartment</span>
            </div>
            <div class="text">
              <h3>Bournemouth Office</h3>
              <p>Visitación de la Encina 22</p>
            </div>
          </div>
        </div>

        <div class="mid">
          <form class="mid-left" action="/" method="POST">
            <div class="detail-1">
              <div class="mid-info">
                <span>First Name</span>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                />
              </div>
              <div class="mid-info">
                <span>Last Name</span>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your Last name"
                />
              </div>
            </div>
            <div class="detail-1">
              <div class="mid-info">
                <span>Email</span>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your Email name"
                />
              </div>
              <div class="mid-info">
                <span>Phone Number</span>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your Phone Number"
                />
              </div>
            </div>
            <div class="help-container">
              <h2>How Can We Help You?</h2>
              <textarea placeholder="Hi there, I would like to...."></textarea>
            </div>
            <div class="mid-end">
              <div class="divider"></div>
            </div>

            <div class="button-container">
              <button class="cancel-btn">CANCEL</button>
              <button class="submit-btn" type="submit">
                SUBMIT
              </button>
            </div>
          </form>
          <div class="mid-right">
            <iframe
              class="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3437.1751352098295!2d76.65720287564314!3d30.516086474689494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fc32344a6e2d7%3A0x81b346dee91799ca!2sChitkara%20University!5e0!3m2!1sen!2sin!4v1725078898797!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{border:"0"}}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ContactMain;
