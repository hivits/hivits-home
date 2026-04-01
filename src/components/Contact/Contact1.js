import React from 'react';
import imgContact from '../../assets/img_contact.png';
import './Contact1.css';

function Contact1() {
  return (
    <section className="contact1">
      <div
        className="contact1__hero"
        style={{ backgroundImage: `url(${imgContact})` }}
      >
        <p className="contact1__hero-text">Contact Us</p>
      </div>
    </section>
  );
}

export default Contact1;