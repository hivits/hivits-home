import { useState, useRef, useEffect, useCallback } from 'react';
import beforeIcon from '../../assets/icon_before.svg';
import nextIcon from '../../assets/icon_next.svg';
import './About5.css';

const HISTORY = [
  { year: '2020', desc: '- 하이비츠 주식회사 설립' },
  { year: '2023', desc: '- 장애인표준사업장 인증 취득\n- 중증장애인 직접생산 인증 취득' },
  { year: '2024', desc: '- 루티(Rooti) 출시' },
  { year: '2025', desc: '- 비츠봇 전국 설치 확대' },
  { year: '2026', desc: '- 펫모아 출시' },
];

const STEP = 350;

function About5() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const currentOffsetRef = useRef(0);
  const maxOffsetRef = useRef(0);

  const calcMax = useCallback(() => {
    if (!sectionRef.current || !trackRef.current) return;
    const sectionWidth = sectionRef.current.offsetWidth;
    const trackScrollWidth = trackRef.current.scrollWidth;
    const max = Math.max(0, trackScrollWidth - sectionWidth);
    setMaxOffset(max);
    maxOffsetRef.current = max;
    setCurrentOffset(prev => {
      const clamped = Math.min(prev, max);
      currentOffsetRef.current = clamped;
      return clamped;
    });
  }, []);

  useEffect(() => {
    calcMax();
    window.addEventListener('resize', calcMax);
    return () => window.removeEventListener('resize', calcMax);
  }, [calcMax]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ✨ capture: true + passive: false 조합으로 preventDefault 확실히 작동
    const handleWheel = (e) => {
      const offset = currentOffsetRef.current;
      const max = maxOffsetRef.current;

      // 섹션이 뷰포트 안에 있는지 체크
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      // 슬라이더 양 끝에선 페이지 스크롤 허용
      if (isScrollingDown && offset >= max) return;
      if (isScrollingUp && offset <= 0) return;

      // 그 외엔 페이지 스크롤 완전 차단
      e.preventDefault();
      e.stopPropagation();

      const next = isScrollingDown
        ? Math.min(offset + STEP, max)
        : Math.max(offset - STEP, 0);

      currentOffsetRef.current = next;
      setCurrentOffset(next);
    };

    section.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    return () => section.removeEventListener('wheel', handleWheel, { capture: true });
  }, []);

  const handlePrev = () => {
    const next = currentOffset <= 0
      ? maxOffset
      : Math.max(currentOffset - STEP, 0);
    setCurrentOffset(next);
    currentOffsetRef.current = next;
  };

  const handleNext = () => {
    const next = currentOffset >= maxOffset
      ? 0
      : Math.min(currentOffset + STEP, maxOffset);
    setCurrentOffset(next);
    currentOffsetRef.current = next;
  };

  return (
    <section className="about5" ref={sectionRef}>

      {/* 흰색 헤더 */}
      <div className="about5__header">
        <h2 className="about5__title">하이비츠가 걸어온 길</h2>
        <p className="about5__desc">
          2020년 작은 시작에서, 이제 전국의 기관과 함께하기까지.<br />
          중증장애인의 일터를 만들고 환경을 살리겠다는 하나의 믿음으로<br />
          하이비츠는 오늘도 한 걸음씩 나아가고 있습니다.
        </p>
      </div>

      {/* 다크 슬라이더 */}
      <div className="about5__dark">

        <div className="about5__nav">
          <button className="about5__nav-btn about5__nav-btn--prev" onClick={handlePrev}>
            <img src={beforeIcon} alt="이전" style={{ filter: 'brightness(0) invert(1)' }} />
          </button>
          <button className="about5__nav-btn about5__nav-btn--next" onClick={handleNext}>
            <img src={nextIcon} alt="다음" />
          </button>
        </div>

        <div className="about5__slider-wrap">
          <div
            className="about5__track"
            ref={trackRef}
            style={{ transform: `translateX(-${currentOffset}px)` }}
          >
            {HISTORY.map((item) => (
              <div key={item.year} className="about5__item">
                <p className="about5__item-year">{item.year}</p>
                <p className="about5__item-desc">
                  {item.desc.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default About5;