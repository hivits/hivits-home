import React from 'react';
import logoHivits from '../../assets/logo_hivits.svg';
import './About7.css';

function About7() {
  return (
    <section className="about7">

      {/* 타이틀 */}
      <h2 className="about7__title">하이비츠 안내</h2>

      {/* 카드 */}
      <div className="about7__card">

        {/* 왼쪽: 구글 지도 */}
        <div className="about7__map">
          <iframe
            title="하이비츠 위치"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.4!2d126.8878!3d37.4849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b61f1e47d9b6b%3A0x0!2z7ISc7Jq47Yq567OE7J207IucIOq1rO66uOuNlCDrlJTsp4DthqDroZwzMeyRkCA2Mg!5e0!3m2!1sko!2skr!4v1710000000000"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* 오른쪽: 회사 정보 */}
        <div className="about7__info">

          {/* 로고 이미지 */}
          <img
            src={logoHivits}
            alt="하이비츠 로고"
            className="about7__logo"
          />

          {/* 정보 목록 */}
          <div className="about7__details">
            <div className="about7__detail-item">
              <p className="about7__detail-label">설립연도</p>
              <p className="about7__detail-value">2020년 3월</p>
            </div>
            <div className="about7__detail-item">
              <p className="about7__detail-label">오피스 위치</p>
              <p className="about7__detail-value">서울 구로구 디지털로31길 62, 1013, 1014호 (구로동,아티스포럼)</p>
            </div>
            <div className="about7__detail-item">
              <p className="about7__detail-label">대표전화</p>
              <p className="about7__detail-value">010-6422-6028</p>
            </div>
            <div className="about7__detail-item">
              <p className="about7__detail-label">사업자번호</p>
              <p className="about7__detail-value">113-82-05802</p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

export default About7;