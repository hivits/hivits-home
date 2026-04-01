import React, { useEffect, useRef, useState } from 'react';
import imgAbout from '../../assets/img_About.png';
import './About1.css';

function About1() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 스크롤 할 수 있는 총 길이 계산
      const maxScroll = height - windowHeight;
      let currentProgress = Math.max(0, -top / maxScroll);
      if (currentProgress > 1) currentProgress = 1;

      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 화면에서도 한번 계산

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✨ 진행률(0~1)에 따라 여백과 모서리 둥글기를 부드럽게 줄여서 0으로 만듭니다.
  // 초기값: 위 120px, 양옆/아래 40px, 모서리 32px
  const paddingTop = 120 - (120 * progress);
  const paddingOther = 40 - (40 * progress);
  const borderRadius = 32 - (32 * progress);

  // 모니터가 매우 클 때를 대비해 서서히 화면 전체 폭(100%)으로 넓어지도록 설정
  const maxWidth = 1840 + (3000 * progress);

  return (
    // ✨ 이 구역을 길게 잡아서 스크롤 공간을 만듦
    <section className="about1" ref={sectionRef}>

      {/* 화면에 딱 고정되는 구역 */}
      <div className="about1__sticky">

        {/* 스크롤에 따라 여백이 줄어드는 바깥 컨테이너 */}
        <div
          className="about1__hero-container"
          style={{
            padding: `${paddingTop}px ${paddingOther}px ${paddingOther}px ${paddingOther}px`
          }}
        >
          {/* 실제 이미지가 들어가는 요소 (점점 꽉 차게 됨) */}
          <div
            className="about1__hero"
            style={{
              backgroundImage: `url(${imgAbout})`,
              borderRadius: `${borderRadius}px`,
              maxWidth: `${maxWidth}px`
            }}
          >
            <h1 className="about1__hero-text">About Hivits</h1>
          </div>
        </div>

      </div>
    </section>
  );
}

export default About1;