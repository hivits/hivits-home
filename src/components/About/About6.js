import React, { useState } from 'react';
import mapImg from '../../assets/img_About6.svg';
import './About6.css';

const MAP_DATA = [
  {
    id: 'seoul',
    top: '27%',
    left: '40%',
    regionTitle: '서울 근로자',
    count: '30명',
  },
  {
    id: 'incheon',
    top: '29%',
    left: '34%',
    regionTitle: '인천/부천 근로자',
    count: '10명',
  },
  {
    id: 'busan',
    top: '72%',
    left: '58%',
    regionTitle: '부산 근로자',
    count: '10명',
  },
  {
    id: 'daegu',
    top: '58%',
    left: '57%',
    regionTitle: '대구/경북 근로자',
    count: '80명',
  },
];

function About6() {
  const [activePoint, setActivePoint] = useState(MAP_DATA[0].id);

  return (
    <section className="about6">

      {/* 왼쪽 텍스트 영역 */}
      <div className="about6__text-wrap">
        <h2 className="about6__title">
          전국에서 하이비츠가 연결해준<br />
          근로자들이 근무중이고,<br />
          하이비츠 비츠봇으로 환경을 지키고 있어요.
        </h2>
      </div>

      {/* 오른쪽 지도 영역 */}
      <div className="about6__map-wrap">
        <img src={mapImg} alt="전국 근로자 지도" className="about6__map-img" />

        {MAP_DATA.map((point) => {
          const isActive = activePoint === point.id;

          return (
            <div
              key={point.id}
              className="about6__point"
              style={{ top: point.top, left: point.left }}
            >
              <button
                className={`about6__dot ${isActive ? 'active' : ''}`}
                onClick={() => setActivePoint(point.id)}
              />

              {isActive && (
                <div className="about6__tooltip">
                  <div className="about6__tooltip-box">
                    <p className="about6__tooltip-region">{point.regionTitle}</p>
                    <p className="about6__tooltip-count">{point.count}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
}

export default About6;