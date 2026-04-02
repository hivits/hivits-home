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
        {/* ✨ 텍스트 슬라이드업을 위한 overflow hidden 래퍼 */}
        <div className="contact1__hero-text-wrapper">
          <p className="contact1__hero-text">Contact Us</p>
        </div>
      </div>
    </section>
  );
}

export default Contact1;