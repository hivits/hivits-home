import arrowIcon from '../../assets/icon_arrow.svg';
import logoJong from '../../assets/logo_jong.svg';
import logoDaiso from '../../assets/logo_daiso.svg';
import logoModu from '../../assets/logo_modu.svg';
import logoKorea from '../../assets/logo_korea.svg';
import logoKunguk from '../../assets/logo_kunguk.svg';
import logoKyungki from '../../assets/logo_kyungki.svg';
import logoSejong from '../../assets/logo_sejong.svg';
import logoSeoul from '../../assets/logo_seoul.svg';
import logoDaejun from '../../assets/logo_daejun.svg';
import logoHana from '../../assets/logo_hana.svg';
import './Main5.css';

const ROW1 = [
  { id: 1, src: logoJong,   alt: '종근당' },
  { id: 2, src: logoDaiso,  alt: '다이소' },
  { id: 3, src: logoModu,   alt: '모두투어' },
  { id: 4, src: logoKorea,  alt: '대한민국국회' },
  { id: 5, src: logoKunguk, alt: '건국대학교병원' },
];

const ROW2 = [
  { id: 6,  src: logoKyungki, alt: '경기도교육청' },
  { id: 7,  src: logoSejong,  alt: '세종특별자치시교육청' },
  { id: 8,  src: logoSeoul,   alt: '서울시설공단' },
  { id: 9,  src: logoDaejun,  alt: '대전광역시교육청' },
  { id: 10, src: logoHana,    alt: '하나투어' },
];

function LogoRow({ logos, direction }) {
  // 무한 슬라이드를 위해 로고 3번 반복
  const repeated = [...logos, ...logos, ...logos];
  return (
    <div className="main5__row-wrap">
      <div className={`main5__row main5__row--${direction}`}>
        {repeated.map((logo, i) => (
          <div key={i} className="main5__logo-card">
            <img src={logo.src} alt={logo.alt} className="main5__logo-img" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Main5() {
  return (
    <section className="main5">
      <div className="main5__top">
        <h2 className="main5__title">이미 다양한 그룹들이 신뢰하고 있습니다</h2>
        <a href="#" className="main5__btn">
          <span className="main5__btn-text">Partners</span>
          <img
            src={arrowIcon}
            alt="arrow"
            className="main5__btn-icon"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </a>
      </div>

      <div className="main5__slider-section">
        <LogoRow logos={ROW1} direction="left" />
        <LogoRow logos={ROW2} direction="right" />
      </div>
    </section>
  );
}

export default Main5;