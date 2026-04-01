import React from 'react';
import imgBusiness from '../../assets/img_business.png';
import './Business1.css';

function Business1() {
  return (
    <section className="business1">
      <div
        className="business1__hero"
        style={{ backgroundImage: `url(${imgBusiness})` }}
      >
        <p className="business1__hero-text">Business</p>
      </div>
    </section>
  );
}

export default Business1;