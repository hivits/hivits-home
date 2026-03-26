import arrowIcon from '../../assets/icon_arrow.svg';
import logoHivits from '../../assets/logo_hivits.svg';
import './Footer.css';

const NAV_ITEMS = ['About Hivits', 'Business', 'Partners', 'Contact Us'];

function Footer() {
  return (
    <footer className="footer">

      {/* 상단: 왼쪽 타이틀+버튼 / 오른쪽 설명+이메일 */}
      <div className="footer__top">

        {/* 왼쪽 */}
        <div className="footer__left">
          <h2 className="footer__title">
            {"하이비츠에 대해 궁금하신가요?\n지금 바로 문의해보세요."}
          </h2>
          <a href="#" className="footer__btn">
            <span className="footer__btn-text">Contact Us</span>
            <img src={arrowIcon} alt="arrow" className="footer__btn-icon" />
          </a>
        </div>

        {/* 오른쪽 */}
        <div className="footer__right">
          <p className="footer__desc">
            {"어떤 문의든 편하게 연락 주시면 빠르게 답변드리겠습니다.\n하이비츠의 여정에 함께해 주세요."}
          </p>
          <p className="footer__email">
            ✉️ 고객지원 및 상담 : hivits01@hi-vits.com
          </p>
        </div>

      </div>

      {/* 구분선 */}
      <div className="footer__divider" />

      {/* 메뉴 */}
      <nav className="footer__nav">
        {NAV_ITEMS.map((item) => (
          <a key={item} href="#" className="footer__nav-item">
            {item}
          </a>
        ))}
      </nav>

      {/* 하단: 법적정보 + 로고 */}
      <div className="footer__bottom">
        <div className="footer__legal">
          <p className="footer__legal-text">
            사업자등록번호: 113-82-05802 | 대표: 최찬숙 | 주소: 서울 구로구 디지털로31길 62, 1013, 1014호 (구로동,아티스포럼)
          </p>
          <p className="footer__legal-text">
            대표 번호: 02-3281-8880 | 이메일: hivits@naver.com | 개인정보처리방침
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