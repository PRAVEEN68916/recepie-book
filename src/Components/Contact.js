import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <h2>Contact Us </h2>
      <p className="contact-intro">
        Have questions, feedback, or recipe suggestions?
        We’d love to hear from you!
        Fill out the form below or reach us through our social channels.
      </p>

      <div className="contact-container">
        {/* Contact Form */}
        <form className="contact-form">
          <h3>Send Us a Message</h3>

          <label>Your Name</label>
          <input type="text" placeholder="Enter your name" required />

          <label>Email Address</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Message</label>
          <textarea placeholder="Write your message..." rows="5" required></textarea>

          <button type="submit">Send Message ✉️</button>
        </form>

        {/* Contact Details */}
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p><strong>Email:</strong> support@recipebook.com</p>
          <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p><strong>Address:</strong> RecipeBook HQ, Food Street, Kitchen City</p>

          <h3>Working Hours</h3>
          <ul className="hours">
            <li>Monday – Friday: 9:00 AM – 6:00 PM</li>
            <li>Saturday: 10:00 AM – 4:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>

          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://www.facebook.com/">📘 Facebook</a>
            <a href="#">📸 Instagram</a>
            <a href="#">🐦 Twitter</a>
            <a href="#">▶️ YouTube</a>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="map-section">
        <h3>Find Us on the Map </h3>
        <p>Visit our office or kitchen studio where all the recipes come to life!</p>

        <div className="map-container">
          <iframe
            title="RecipeBook Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0192702341465!2d-122.41941528468192!3d37.774929779759555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085817c06e1f53f%3A0xdda6baf2b5e9bdf!2sFood%20Street!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            width="100%"
            height="350"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

    </div>
  );
};

export default Contact;