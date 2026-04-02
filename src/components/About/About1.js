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

      const maxScroll = height - windowHeight;
      let currentProgress = Math.max(0, -top / maxScroll);
      if (currentProgress > 1) currentProgress = 1;

      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const paddingTop = 120 - (120 * progress);
  const paddingOther = 40 - (40 * progress);
  const borderRadius = 32 - (32 * progress);
  const maxWidth = 1840 + (3000 * progress);

  return (
    <section className="about1" ref={sectionRef}>
      <div className="about1__sticky">
        <div
          className="about1__hero-container"
          style={{
            padding: `${paddingTop}px ${paddingOther}px ${paddingOther}px ${paddingOther}px`
          }}
        >
          <div
            className="about1__hero"
            style={{
              backgroundImage: `url(${imgAbout})`,
              borderRadius: `${borderRadius}px`,
              maxWidth: `${maxWidth}px`
            }}
          >
            {/* ✨ 텍스트 슬라이드업을 위한 overflow hidden 래퍼 */}
            <div className="about1__hero-text-wrapper">
              <h1 className="about1__hero-text">About Hivits</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About1;