import { useState, useRef, useEffect } from 'react';
import beforeIcon from '../../assets/icon_before.svg';
import nextIcon from '../../assets/icon_next.svg';
import arrowIcon from '../../assets/icon_arrow.svg';
import rootiImg from '../../assets/rooti.png';
import vitsbotImg from '../../assets/vitsbot.png';
import petmoaImg from '../../assets/petmoa.png';
import airImg from '../../assets/air.png';
import logoRooti from '../../assets/logo_rooti.svg';
import logoVitsbot from '../../assets/logo_vitsbot.svg';
import logoPetmoa from '../../assets/logo_petmoa.svg';
import logoAir from '../../assets/logo_air.svg';
import './Main3.css';

const CARDS = [
  {
    id: 1, img: rootiImg, logo: logoRooti,
    name: '루티 (Rooti)', desc: 'AI 기반 장애인 일자리 플랫폼',
    hover: 'AI기반 중증장애인 고용지원 + 환경보호 통합 플랫폼으로서 다양한 기업과 협업하여 사용되고 있습니다.',
  },
  {
    id: 2, img: vitsbotImg, logo: logoVitsbot,
    name: '비츠봇(ViTSBOT)', desc: 'AI PET병 분리·수거 자판기 로봇',
    hover: 'AI기반의 리사이클링 로봇으로, PET병을 자동 인식하고 분류,수거합니다. 더불어 고용창출에도 기여하고 있습니다.',
  },
  {
    id: 3, img: petmoaImg, logo: logoPetmoa,
    name: '펫모아(MoA)', desc: '반려동물과 함께하는 종합 라이프 플랫폼',
    hover: '펫 앨범, 펫시터, 펫 미션 등 반려동물과 보호자의 모든 일상을 하나의 앱에서. 곧 만나보실 수 있습니다.',
  },
  {
    id: 4, img: airImg, logo: logoAir,
    name: '에어케어봇', desc: '로봇 기반 냉난방기·공조 세척 서비스',
    hover: '국내 유일 장애인 직접 생산인증 로봇 세척 서비스입니다. 장애인 고용창출에도 다양하게 기여하고 있습니다.',
  },
];

const CARD_WIDTH = 500;
const CARD_GAP = 20;
const LEFT_PADDING = 130; // main3 왼쪽 여백

function Main3() {
  const [current, setCurrent] = useState(0);
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    // 카드가 왼쪽 여백(130px) 기준 안에서 이동
    // current=0이면 translateX(0), current=1이면 카드 하나만큼 이동
    const move = current * (CARD_WIDTH + CARD_GAP);
    setOffset(move);
  }, [current]);

  const handlePrev = () => { if (current > 0) setCurrent((c) => c - 1); };
  const handleNext = () => { if (current < CARDS.length - 1) setCurrent((c) => c + 1); };

  return (
    <section className="main3" ref={sectionRef}>
      <div className="main3__inner">

        <div className="main3__top">
          <div className="main3__top-left">
            <h2 className="main3__title">
              더 나은 세상을 향한<br />하이비츠의 다섯 가지 이야기
            </h2>
            <a href="#" className="main3__btn">
              <span className="main3__btn-text">Business</span>
              <img src={arrowIcon} alt="arrow" className="main3__btn-icon"
                style={{ filter: 'brightness(0) invert(1)' }} />
            </a>
          </div>

          <div className="main3__nav-btns">
            <button className="main3__nav-btn main3__nav-btn--prev"
              onClick={handlePrev} disabled={current === 0}>
              <img src={beforeIcon} alt="이전" />
            </button>
            <button className="main3__nav-btn main3__nav-btn--next"
              onClick={handleNext} disabled={current === CARDS.length - 1}>
              <img src={nextIcon} alt="다음"
                style={{ filter: 'brightness(0) invert(1)' }} />
            </button>
          </div>
        </div>

        {/* 슬라이더: 왼쪽 여백 포함 전체 너비 기준으로 overflow hidden */}
        <div className="main3__slider-wrap">
          <div className="main3__slider">
            <div
              className="main3__track"
              style={{ transform: `translateX(-${offset}px)` }}
            >
              {CARDS.map((card) => (
                <div key={card.id} className="main3__card"
                  style={{ backgroundImage: `url(${card.img})` }}>
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