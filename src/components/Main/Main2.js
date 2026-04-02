import { Link } from 'react-router-dom';
import { useState, useRef, useEffect, useCallback } from 'react';
import hivisImg from '../../assets/img_hivits.png';
import arrowIcon from '../../assets/icon_arrow.svg';
import arrowHoverIcon from '../../assets/icon_arrow_hover.svg';
import './Main2.css';

/* 가속/감속 이징 함수 */
const easeInOut = (t) => {
  t = Math.max(0, Math.min(1, t));
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

function Main2() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const isMobile = useRef(false);

  /* 모바일 체크 */
  const checkMobile = useCallback(() => {
    isMobile.current = window.innerWidth <= 768;
    if (isMobile.current) {
      setProgress(1); /* 모바일은 최종 상태 고정 */
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (isMobile.current) return;
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrolled = -rect.top;
    const maxScroll = sectionHeight - viewportHeight;

    if (maxScroll <= 0) return;

    const p = Math.min(1, Math.max(0, scrolled / maxScroll));
    setProgress(p);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkMobile);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [handleScroll, checkMobile]);

  /* ── 페이즈 1 (progress 0→0.55): 이미지 축소 + gap 생성 ── */
  const imgPhase = easeInOut(Math.min(1, progress / 0.55));
  const imgWidthPct = 100 - 52 * imgPhase; /* 100% → 48% */
  const gapPx = Math.round(80 * imgPhase);  /* 0px  → 80px */

  /* ── 페이즈 2 (progress 0.65→1.0): 텍스트 슬라이드인 ── */
  const textPhase = easeInOut(Math.max(0, (progress - 0.65) / 0.35));
  const textOpacity = textPhase;
  const textX = 60 * (1 - textPhase); /* 60px → 0px */

  return (
    <section className="main2" ref={sectionRef}>
      <div className="main2__sticky">
        <div
          className="main2__inner"
          style={{ gap: `${gapPx}px` }}
        >

          {/* 왼쪽 이미지 */}
          <div
            className="main2__img-wrap"
            style={{ width: `${imgWidthPct}%` }}
          >
            <img src={hivisImg} alt="하이비츠 팀" className="main2__img" />
          </div>

          {/* 오른쪽 텍스트 */}
          <div
            className="main2__content"
            style={{
              opacity: textOpacity,
              transform: `translateX(${textX}px)`,
            }}
          >
            <h2 className="main2__title">
              기술로 사람과 환경의<br />더 나은 내일을 만들어 갑니다
            </h2>
            <p className="main2__desc">
              하이비츠는 2020년 설립된 장애인표준사업장 인증 기업입니다.<br />
              AI 기술을 통해 중증장애인에게 안정적인 일자리를 만들고,<br />
              환경 문제를 해결하며, 사람과 반려동물이 함께 행복한 세상을 만들어갑니다.
            </p>
            <Link to="/about" className="main2__btn">
              <span className="main2__btn-text">About Hivits</span>
              <div className="main2__btn-icon-wrap">
                <img src={arrowIcon}      alt="arrow" className="icon-default" />
                <img src={arrowHoverIcon} alt="arrow" className="icon-hover" style={{ filter: 'brightness(0) invert(1)' }} />
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Main2;