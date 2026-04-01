import React from 'react';
import imgPartners from '../../assets/img_partners.png';
import './Partners1.css';

function Partners1() {
  return (
    <section className="partners1">
      <div
        className="partners1__hero"
        style={{ backgroundImage: `url(${imgPartners})` }}
      >
        <p className="partners1__hero-text">Partners</p>
      </div>
    </section>
  );
}

export default Partners1;