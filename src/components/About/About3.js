import React, { useEffect, useRef } from 'react';
import imgAbout3 from '../../assets/img_About3.svg';
import './About3.css';

function About3() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ✨ 섹션이 화면에 30% 이상 보이면 .is-visible 추가 → 슬라이드인 시작
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('is-visible');
          observer.disconnect(); // 한 번만 실행
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about3" ref={sectionRef}>
      {/* 1. 왼쪽에서 슬라이딩 등장하는 Mission 배경 텍스트 */}
      <div className="about3__bg-mission">Mission</div>

      <div className="about3__inner">

        {/* 2. 왼쪽 영역: 한국어 설명 텍스트들 */}
        <div className="about3__left">
          <p className="about3__desc-main">
            AI 기술을 통해 환경 보호와 중증장애인 고용이라는<br />
            두가지 사회적 과제를 동시에 해결하는 혁신형 기술 기업으로 성장합니다.
          </p>
          <p className="about3__desc-sub">
            하이비츠는 2020년 설립된 장애인표준사업장 인증 기업으로,<br />
            AI 기술을 통해 중증장애인의 일자리를 만들고 환경을 살리며 사람과 반려동물이 함께하는 더 나은 세상을 설계합니다.
          </p>
        </div>

        {/* 3. 오른쪽 영역: 이미지와 오른쪽에서 슬라이딩 등장하는 Vision 텍스트 */}
        <div className="about3__right">
          <img src={imgAbout3} alt="About Hivits Vision" className="about3__img" />
          <div className="about3__bg-vision">&amp; Vision</div>
        </div>

      </div>
    </section>
  );
}

export default About3;