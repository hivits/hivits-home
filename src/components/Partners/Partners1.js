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
        {/* ✨ 텍스트 슬라이드업을 위한 overflow hidden 래퍼 */}
        <div className="partners1__hero-text-wrapper">
          <p className="partners1__hero-text">Partners</p>
        </div>
      </div>
    </section>
  );
}

export default Partners1;