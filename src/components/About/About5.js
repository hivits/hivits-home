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

// ✨ 한 번 클릭 시 이동할 픽셀 폭 (기존 700px -> 350px로 줄여서 덜 씩 이동하게 함)
// 이 숫자를 줄이면 더 조금씩 가고, 늘리면 훅훅 넘어갑니다.
const STEP = 350;

function About5() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const calcMax = useCallback(() => {
    if (!sectionRef.current || !trackRef.current) return;
    const sectionWidth = sectionRef.current.offsetWidth;
    const trackScrollWidth = trackRef.current.scrollWidth;

    // 컨테이너 너비와 실제 트랙 너비를 빼서 최대 스크롤 가능 수치를 구합니다.
    const max = Math.max(0, trackScrollWidth - sectionWidth);
    setMaxOffset(max);

    // 리사이즈 시 현재 오프셋이 최대치를 넘지 않도록 안전장치 추가
    setCurrentOffset(prev => Math.min(prev, max));
  }, []);

  useEffect(() => {
    calcMax();
    window.addEventListener('resize', calcMax);
    return () => window.removeEventListener('resize', calcMax);
  }, [calcMax]);

  const handlePrev = () => {
    if (currentOffset <= 0) setCurrentOffset(maxOffset);
    else setCurrentOffset(prev => Math.max(prev - STEP, 0));
  };

  const handleNext = () => {
    if (currentOffset >= maxOffset) setCurrentOffset(0);
    else setCurrentOffset(prev => Math.min(prev + STEP, maxOffset));
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

        {/* 네비 버튼 */}
        <div className="about5__nav">
          <button
            className="about5__nav-btn about5__nav-btn--prev"
            onClick={handlePrev}
          >
            <img src={beforeIcon} alt="이전" style={{ filter: 'brightness(0) invert(1)' }} />
          </button>
          <button
            className="about5__nav-btn about5__nav-btn--next"
            onClick={handleNext}
          >
            <img src={nextIcon} alt="다음" />
          </button>
        </div>

        {/* 슬라이더 구역 */}
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