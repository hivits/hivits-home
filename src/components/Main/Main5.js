import { Link } from 'react-router-dom';
import arrowIcon from '../../assets/icon_arrow.svg';
import arrowHoverIcon from '../../assets/icon_arrow_hover.svg';

import logoJong from '../../assets/logo_jong.svg';
import logoDaiso from '../../assets/logo_daiso.svg';
import logoModu from '../../assets/logo_modu.svg';
import logoKorea from '../../assets/logo_korea.svg';
import logoKunguk from '../../assets/logo_kunguk.svg';
import logoKyungki from '../../assets/logo_kyungki.svg';
import logoSejong from '../../assets/logo_sejong.svg';
import logoSeoul from '../../assets/logo_seoul.svg';
import logoDaejun from '../../assets/logo_daejun.svg';
import logoChungnam from '../../assets/logo_chungnam.svg';
import logoBugyung from '../../assets/logo_bugyung.svg';
import logoKoreatech from '../../assets/logo_koreatech.svg';
import logoYonsei from '../../assets/logo_yonsei.svg';
import logoGukbang from '../../assets/logo_gukbang.svg';
import logoUseplace from '../../assets/logo_useplace.svg';
import logoPolice from '../../assets/logo_police.svg';
import './Main5.css';

const ROW1 = [
  { id: 1,  src: logoJong,      alt: '종근당' },
  { id: 2,  src: logoDaiso,     alt: '다이소' },
  { id: 3,  src: logoModu,      alt: '모두투어' },
  { id: 4,  src: logoKorea,     alt: '대한민국국회' },
  { id: 5,  src: logoKunguk,    alt: '건국대학교병원' },
  { id: 6,  src: logoBugyung,   alt: '부경대학교' },
  { id: 7,  src: logoKoreatech, alt: '한국정보기술단' },
  { id: 8,  src: logoPolice,    alt: '서울종암경찰서' },
];

const ROW2 = [
  { id: 9,  src: logoKyungki,  alt: '경기도교육청' },
  { id: 10, src: logoSejong,   alt: '세종특별자치시교육청' },
  { id: 11, src: logoSeoul,    alt: '서울시설공단' },
  { id: 12, src: logoDaejun,   alt: '대전광역시교육청' },
  { id: 13, src: logoYonsei,   alt: '연세올바른재활의학과의원' },
  { id: 14, src: logoGukbang,  alt: '국방홍보원' },
  { id: 15, src: logoUseplace, alt: '유즈플레이스' },
  { id: 16, src: logoChungnam, alt: '충남대학교' },
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
        <Link to="/partners" className="main5__btn">
          <span className="main5__btn-text">Partners</span>
          <div className="main5__btn-icon-wrap">
            <img src={arrowIcon}      alt="arrow" className="icon-default" />
            <img src={arrowHoverIcon} alt="arrow" className="icon-hover"   style={{ filter: 'brightness(0) invert(1)' }} />
          </div>
        </Link>
      </div>

      <div className="main5__slider-section">
        <LogoRow logos={ROW1} direction="left" />
        <LogoRow logos={ROW2} direction="right" />
      </div>
    </section>
  );
}

export default Main5;