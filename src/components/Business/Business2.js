import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Business2.css';
import imgRooti from '../../assets/img_business_rooti.webp';
import imgVitsbot from '../../assets/img_business_vitsbot.webp';
import imgPetmoa from '../../assets/img_business_petmoa.webp';
import imgAircare from '../../assets/img_business_aircare.webp';
import imgEsg from '../../assets/img_business_esg.webp';

// 탭 메뉴 리스트
const TABS = [
  "루티(Rooti)",
  "하이비츠 비츠봇",
  "펫모아",
  "에어컨 세척 서비스",
  "ESG 경영"
];

// 탭별 이미지
const IMAGES = [
  imgRooti,
  imgVitsbot,
  imgPetmoa,
  imgAircare,
  imgEsg,
];

function Business2() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchParams] = useSearchParams();
  const contentRef = useRef(null);

  useEffect(() => {
    const tab = parseInt(searchParams.get('tab'), 10);
    if (!isNaN(tab) && tab >= 0 && tab < TABS.length) {
      setActiveTab(tab);
      // Main3 카드에서 넘어올 때 해당 탭 이미지로 바로 스크롤
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  }, [searchParams]);

  return (
    <section className="business-portfolio">
      <div className="business-portfolio__inner">
        <h2 className="business-portfolio__title">
          {"기술로 만들어가는\n다섯 가지 변화"}
        </h2>

        <div className="business-portfolio__tabs">
          {TABS.map((tab, index) => (
            <button
              key={index}
              className={`business-portfolio__tab ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="business-portfolio__content" ref={contentRef}>
          <img src={IMAGES[activeTab]} alt={`${TABS[activeTab]} 포트폴리오`} loading="lazy" />
        </div>
      </div>
    </section>
  );
}

export default Business2;