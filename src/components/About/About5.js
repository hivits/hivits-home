import { useState, useRef } from 'react';
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

const STEP = 460; // 아이템 너비(380) + gap(80)

function About5() {
  const [offset, setOffset] = useState(0);
  const trackRef = useRef(null);
  const wrapRef = useRef(null);

  const getMax = () => {
    if (!trackRef.current || !wrapRef.current) return 0;
    return Math.max(0, trackRef.current.scrollWidth - wrapRef.current.offsetWidth);
  };

  const handlePrev = () => {
    setOffset(prev => Math.max(prev - STEP, 0));
  };

  const handleNext = () => {
    setOffset(prev => Math.min(prev + STEP, getMax()));
  };

  return (
    <section className="about5">

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

        <div className="about5__slider-wrap" ref={wrapRef}>
          <div
            className="about5__track"
            ref={trackRef}
            style={{ transform: `translateX(-${offset}px)` }}
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