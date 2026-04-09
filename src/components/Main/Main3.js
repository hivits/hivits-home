import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import beforeIcon from '../../assets/icon_before.svg';
import nextIcon from '../../assets/icon_next.svg';
import arrowIcon from '../../assets/icon_arrow.svg';
import arrowHoverIcon from '../../assets/icon_arrow_hover.svg';
import rootiImg from '../../assets/rooti.png';
import vitsbotImg from '../../assets/vitsbot.png';
import petmoaImg from '../../assets/petmoa.png';
import airImg from '../../assets/air.png';
import logoRooti from '../../assets/logo_rooti.svg';
import logoVitsbot from '../../assets/logo_vitsbot.svg';
import logoPetmoa from '../../assets/logo_petmoa.svg';
import logoAir from '../../assets/logo_air.svg';
import esgImg from '../../assets/img_esg.png';
import logoEsg from '../../assets/logo_ESG.svg';
import './Main3.css';

const CARDS = [
  {
    id: 1, tabIndex: 0, img: rootiImg, logo: logoRooti,
    name: '루티 (Rooti)', desc: 'AI 기반 장애인 일자리 플랫폼',
    hover: 'AI기반 중증장애인 고용지원 + 환경보호 통합 플랫폼으로서 다양한 기업과 협업하여 사용되고 있습니다.',
  },
  {
    id: 2, tabIndex: 1, img: vitsbotImg, logo: logoVitsbot,
    name: '비츠봇(ViTSBOT)', desc: 'AI PET병 분리·수거 자판기 로봇',
    hover: 'AI기반의 리사이클링 로봇으로, PET병을 자동 인식하고 분류,수거합니다. 더불어 고용창출에도 기여하고 있습니다.',
  },
  {
    id: 3, tabIndex: 2, img: petmoaImg, logo: logoPetmoa,
    name: '펫모아(MoA)', desc: '반려동물과 함께하는 종합 라이프 플랫폼',
    hover: '펫 앨범, 펫시터, 펫 미션 등 반려동물과 보호자의 모든 일상을 하나의 앱에서. 곧 만나보실 수 있습니다.',
  },
  {
    id: 4, tabIndex: 3, img: airImg, logo: logoAir,
    name: '에어케어봇', desc: '로봇 기반 냉난방기·공조 세척 서비스',
    hover: '국내 유일 장애인 직접 생산인증 로봇 세척 서비스입니다. 장애인 고용창출에도 다양하게 기여하고 있습니다.',
  },
  {
    id: 5, tabIndex: 4, img: esgImg, logo: logoEsg,
    name: 'ESG경영', desc: '하이비츠는 기술 중심의 미래형 ESG 기업입니다.',
    hover: '환경적, 사회적, 경제적인 모든 부분을 생각하여 사회적인 가치를 실현하며 다양한 분야에 기여하고 있습니다.',
  },
];

const CARD_GAP = 20;

function Main3() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [maxSteps, setMaxSteps] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const [step, setStep] = useState(520); // 실제 카드 크기 기반으로 동적 계산
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const calcMax = useCallback(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const sectionWidth = sectionRef.current.offsetWidth;
    const trackScrollWidth = trackRef.current.scrollWidth;

    // 실제 첫 번째 카드 DOM 크기로 STEP 계산
    const firstCard = trackRef.current.querySelector('.main3__card');
    const cardWidth = firstCard ? firstCard.offsetWidth : 500;
    const dynamicStep = cardWidth + CARD_GAP;
    setStep(dynamicStep);

    // 마지막 카드 오른쪽에 20px 여백이 남는 지점
    const max = Math.max(0, trackScrollWidth - sectionWidth + 20);
    setMaxOffset(max);

    // 최대 이동 횟수
    const steps = Math.ceil(max / dynamicStep);
    setMaxSteps(steps);

    // 화면 크기가 바뀌면 현재 stepIndex가 새 maxSteps를 넘지 않도록 보정
    setStepIndex((prev) => Math.min(prev, steps));
  }, []);

  useEffect(() => {
    calcMax();
    window.addEventListener('resize', calcMax);
    return () => window.removeEventListener('resize', calcMax);
  }, [calcMax]);

  // stepIndex → offset 계산 (실제 카드 크기 기반 step 사용)
  const offset = stepIndex >= maxSteps
    ? maxOffset
    : stepIndex * step;

  const isFirst = stepIndex === 0;
  const isLast = stepIndex >= maxSteps;

  const handlePrev = () => {
    if (!isFirst) setStepIndex((i) => i - 1);
  };

  const handleNext = () => {
    if (!isLast) setStepIndex((i) => i + 1);
  };

  return (
    <section className="main3" ref={sectionRef}>
      <div className="main3__inner">

        <div className="main3__top">
          <div className="main3__top-left">
            <h2 className="main3__title">
              더 나은 세상을 향한<br />하이비츠의 다섯 가지 이야기
            </h2>
            {/* Business 버튼 + 네비 버튼 같은 줄 (모바일) */}
            <div className="main3__btn-nav-row">
              <Link to="/business" className="main3__btn">
                <span className="main3__btn-text">Business</span>
                <div className="main3__btn-icon-wrap">
                  <img src={arrowIcon}      alt="arrow" className="icon-default" />
                  <img src={arrowHoverIcon} alt="arrow" className="icon-hover"   style={{ filter: 'brightness(0) invert(1)' }} />
                </div>
              </Link>
              {/* 모바일 전용 네비 버튼 */}
              <div className="main3__nav-btns main3__nav-btns--inline">
                <button className="main3__nav-btn main3__nav-btn--prev" onClick={handlePrev} disabled={isFirst}>
                  <img src={beforeIcon} alt="이전" />
                </button>
                <button className="main3__nav-btn main3__nav-btn--next" onClick={handleNext} disabled={isLast}>
                  <img src={nextIcon} alt="다음" style={{ filter: 'brightness(0) invert(1)' }} />
                </button>
              </div>
            </div>
          </div>

          <div className="main3__nav-btns main3__nav-btns--top">
            <button
              className="main3__nav-btn main3__nav-btn--prev"
              onClick={handlePrev}
              disabled={isFirst}
            >
              <img src={beforeIcon} alt="이전" />
            </button>
            <button
              className="main3__nav-btn main3__nav-btn--next"
              onClick={handleNext}
              disabled={isLast}
            >
              <img src={nextIcon} alt="다음"
                style={{ filter: 'brightness(0) invert(1)' }} />
            </button>
          </div>
        </div>

        <div className="main3__slider-wrap">
          <div className="main3__slider">
            <div
              className="main3__track"
              ref={trackRef}
              style={{ transform: `translateX(-${offset}px)` }}
            >
              {CARDS.map((card) => (
                <div
                  key={card.id}
                  className="main3__card"
                  style={{ backgroundImage: `url(${card.img})`, cursor: 'pointer' }}
                  onClick={() => navigate(`/business?tab=${card.tabIndex}`)}
                >
                  <div className="main3__card-overlay" />

                  <div className="main3__card-default">
                    <img src={card.logo} alt={card.name} className="main3__card-logo" />
                    <p className="main3__card-name">{card.name}</p>
                    <p className="main3__card-desc">{card.desc}</p>
                  </div>

                  <div className="main3__card-hover">
                    <img src={card.logo} alt={card.name} className="main3__card-logo" />
                    <p className="main3__card-name">{card.name}</p>
                    <p className="main3__card-desc">{card.desc}</p>
                    <p className="main3__card-hover-text">{card.hover}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Main3;