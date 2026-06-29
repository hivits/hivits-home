import React, { useEffect, useRef, useState } from 'react';
import imgAbout2 from '../../assets/img_About2.webp';
import './About2.css';

function About2() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 이미지가 화면 윗부분에 닿는 순간(top <= 0)부터 진행률 계산 시작
      const maxScroll = height - windowHeight;
      // 스크롤 성능 최적화를 위한 Math.max 사용
      let currentProgress = Math.max(0, -top / maxScroll);
      if (currentProgress > 1) currentProgress = 1;

      setProgress(currentProgress);
    };

    // rAF 스로틀 + passive: 매 스크롤 이벤트 리렌더를 프레임당 1회로 묶어 버벅임 제거(시각 동일)
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { handleScroll(); ticking = false; });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // 초기 화면에서도 한번 계산

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    // 전체 구역 길이를 넉넉하게 잡아서 스크롤 공간을 만듦 (기존 300vh 유지)
    <section className="about2" ref={sectionRef}>

      {/* 화면에 딱 고정되는 구역 (100vh) */}
      <div className="about2__sticky">

        {/* 배경 이미지 */}
        <div
          className="about2__bg"
          style={{ backgroundImage: `url(${imgAbout2})` }}
        ></div>

        {/* ✨ 글자들이 차곡차곡 쌓일 컨테이너 */}
        <div className="about2__content">

          {/* 첫 번째 제목: 진행률 10% 이상에서 등장 (사라지지 않음) */}
          <div
            className={`about2__text-step ${
              progress >= 0.1 ? 'active' : ''
            }`}
          >
            <h2 className="about2__title">
              기술이 사람을 향할 때, 세상은 달라집니다.
            </h2>
          </div>

          {/* 두 번째 & 세 번째 텍스트: 진행률 50% 이상에서 등장 (위 제목 아래에 쌓임) */}
          <div
            className={`about2__text-step ${
              progress >= 0.5 ? 'active' : ''
            }`}
          >
            {/* ✨ 요청하신 8px 여백으로 묶인 두 개의 텍스트 */}
            <div className="about2__text-group">
              <p className="about2__subtitle">TECHNOLOGY FOR PEOPLE</p>
              <p className="about2__description">
                하이비츠의 모든 기술은 더 많은 사람이 존엄하게 일하고, 더 나은 환경에서 살아갈 수 있도록 설계됩니다.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default About2;