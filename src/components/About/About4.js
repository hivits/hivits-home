import React from 'react';
import imgAbout4 from '../../assets/img_About4.png';
import './About4.css';

function About4() {
  return (
    <section className="about4">

      {/* 다크 카드 */}
      <div className="about4__card">
        <img src={imgAbout4} alt="" className="about4__card-bg" />

        <div className="about4__card-inner">

          {/* 포용 */}
          <div className="about4__section">
            <h3 className="about4__section-title">포용</h3>
            <p className="about4__section-desc">
              누구도 소외되지 않는 세상을 <br />
              만듭니다. 모두가 존엄하게<br />
              일할 수 있는 환경을 기술로 설계합니다.
            </p>
          </div>

          <div className="about4__divider" />

          {/* 순환 */}
          <div className="about4__section">
            <h3 className="about4__section-title">순환</h3>
            <p className="about4__section-desc">
              버려지는 것은 없습니다.<br />
              폐자원을 되살리고, 그 과정에서<br />
              새로운 일자리와 가치를 만들어냅니다.
            </p>
          </div>

          <div className="about4__divider" />

          {/* 공존 */}
          <div className="about4__section">
            <h3 className="about4__section-title">공존</h3>
            <p className="about4__section-desc">
              사람과 지구, 그리고 반려동물까지.<br />
              하이비츠가 만드는 기술은 모두가<br />
              함께 살아가는 세상을 향합니다.
            </p>
          </div>

        </div>
      </div>

      {/* 카드 아래 본문 */}
      <div className="about4__bottom-text">
        <p>
          누구도 소외되지 않고, 버려지는 것도 없으며, 모든 생명이 함께 살아가는 세상. 하이비츠는 그 세상이 먼 미래가 아니라 지금 우리 곁에 있다고 믿습니다.<br />
          기술이 사람을 향할 때, 세상은 반드시 더 나아진다는 믿음으로 오늘도 나아갑니다.
        </p>
      </div>

    </section>
  );
}

export default About4;