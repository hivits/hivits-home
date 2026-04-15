import { Link } from 'react-router-dom';
import arrowIcon from '../../assets/icon_arrow.svg';
import arrowHoverIcon from '../../assets/icon_arrow_hover.svg';
import logoHivits from '../../assets/logo_hivits.svg';
import './Footer.css';

const NAV_ITEMS = [
  { name: 'About Hivits', path: '/about' },
  { name: 'Business',     path: '/business' },
  { name: 'Partners',     path: '/partners' },
  { name: 'Contact Us',   path: '/contact' },
];

function Footer({ noMargin = false }) {
  return (
    <footer className={`footer${noMargin ? ' footer--no-margin' : ''}`}>

      {/* 상단: 왼쪽 타이틀+버튼 / 오른쪽 설명+이메일 */}
      <div className="footer__top">

        {/* 왼쪽 */}
        <div className="footer__left">
          <h2 className="footer__title">
            {"하이비츠에 대해 궁금하신가요?\n지금 바로 문의해보세요."}
          </h2>
          <Link to="/contact" className="footer__btn">
            <span className="footer__btn-text">Contact Us</span>
            <div className="footer__btn-icon-wrap">
              <img src={arrowIcon}      alt="arrow" className="icon-default" style={{ filter: 'brightness(0) invert(1)' }} />
              <img src={arrowHoverIcon} alt="arrow" className="icon-hover"  style={{ filter: 'brightness(0)' }} />
            </div>
          </Link>
        </div>

        {/* 오른쪽 */}
        <div className="footer__right">
          <p className="footer__desc">
            {"어떤 문의든 편하게 연락 주시면 빠르게 답변드리겠습니다.\n하이비츠의 여정에 함께해 주세요."}
          </p>
          <p className="footer__email">
            ✉️ 고객지원 및 상담 : hivits@naver.com
          </p>
        </div>

      </div>

      {/* 구분선 */}
      <div className="footer__divider" />

      {/* 메뉴 */}
      <nav className="footer__nav">
        {NAV_ITEMS.map((item) => (
          <Link key={item.name} to={item.path} className="footer__nav-item">
            {item.name}
          </Link>
        ))}
      </nav>

      {/* 하단: 법적정보 + 로고 */}
      <div className="footer__bottom">
        <div className="footer__legal">
          <p className="footer__legal-text">
            사업자등록번호: 788-86-01781 | 대표: 최찬숙 | 주소: 서울 구로구 디지털로31길 62, 1013, 1014호 (구로동,아티스포럼)
          </p>
          <p className="footer__legal-text">
            대표 번호: 02-3281-8880 | 이메일: hivits@naver.com | <Link to="/privacy" className="footer__privacy-link">개인정보처리방침</Link>
          </p>
        </div>
        <div className="footer__logo">
          <img src={logoHivits} alt="하이비츠 로고" />
        </div>
      </div>

    </footer>
  );
}

export default Footer;