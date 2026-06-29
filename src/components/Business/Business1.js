import React from 'react';
import imgBusiness from '../../assets/img_business.webp';
import './Business1.css';

function Business1() {
  return (
    <section className="business1">
      <div
        className="business1__hero"
        style={{ backgroundImage: `url(${imgBusiness})` }}
      >
        {/* ✨ 텍스트 슬라이드업을 위한 overflow hidden 래퍼 */}
        <div className="business1__hero-text-wrapper">
          <p className="business1__hero-text">Business</p>
        </div>
      </div>
    </section>
  );
}

export default Business1;