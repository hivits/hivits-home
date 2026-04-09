import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import menuIcon from '../../assets/icon_menu.svg';
import cancelIcon from '../../assets/icon_cancel.svg';
import { ReactComponent as HivitsLogo } from '../../assets/logo_hivits.svg';
import './Header.css';

const NAV_ITEMS = [
  { name: 'About Hivits', path: '/about' },
  { name: 'Business', path: '/business' },
  { name: 'Partners', path: '/partners' },
  { name: 'Contact Us', path: '/contact' },
];

function Header() {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 메뉴 열릴 때 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    // 페이지 이동 시 메뉴 닫기
    setMenuOpen(false);
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (!header) return;

      const headerRect = header.getBoundingClientRect();
      const headerCenterY = headerRect.top + headerRect.height / 2;
      const sections = document.querySelectorAll('section, footer, main, article, [class*="section"], [class*="bg-"]');

      let isOverDark = false;

      sections.forEach((sec) => {
        const secRect = sec.getBoundingClientRect();
        if (headerCenterY >= secRect.top && headerCenterY <= secRect.bottom) {
          const bgColor = window.getComputedStyle(sec).backgroundColor;
          if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
            const rgb = bgColor.match(/\d+/g);
            if (rgb && rgb.length >= 3) {
              const r = parseInt(rgb[0], 10);
              const g = parseInt(rgb[1], 10);
              const b = parseInt(rgb[2], 10);
              const brightness = (r * 299 + g * 587 + b * 114) / 1000;
              if (brightness < 128) {
                isOverDark = true;
              }
            }
          }
        }
      });

      setIsDark(isOverDark);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  // 로고 클릭 핸들러: 홈이면 새로고침, 다른 페이지면 홈으로 이동
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.location.reload();
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <header className={`header ${isDark ? 'header--dark' : ''}`}>

        {/* ✨ 햄버거 + 로고를 하나의 div로 묶어서 왼쪽 정렬 */}
        <div className="header__left">
          <button
            className="header__hamburger"
            aria-label="메뉴 열기"
            onClick={() => setMenuOpen(true)}
          >
            <img
              src={menuIcon}
              alt="메뉴"
              style={{ filter: isDark ? 'brightness(0) invert(1)' : 'none', width: '28px', height: '28px' }}
            />
          </button>
          <div className="header__logo">
            {/* 홈이면 새로고침, 다른 페이지면 홈으로 이동 */}
            <a href="/" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
              <HivitsLogo />
            </a>
          </div>
        </div>

        <nav className="header__nav">
          {NAV_ITEMS.slice(0, 3).map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`header__nav-item ${location.pathname === item.path ? 'header__nav-item--active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="header__contact-wrap">
          <Link to="/contact" className="header__contact">
            Contact
          </Link>
        </div>

      </header>

      {/* ✨ 모바일 풀스크린 메뉴 오버레이 */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>

        {/* 메뉴 상단: 로고 + 닫기 버튼 */}
        <div className="mobile-menu__header">
          <div className="mobile-menu__logo">
            <a href="/" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
              <HivitsLogo />
            </a>
          </div>
          <button
            className="mobile-menu__close"
            aria-label="메뉴 닫기"
            onClick={() => setMenuOpen(false)}
          >
            <img src={cancelIcon} alt="닫기" width="28" height="28" />
          </button>
        </div>

        {/* 메뉴 아이템 */}
        <nav className="mobile-menu__nav">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="mobile-menu__item"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>

      </div>
    </>
  );
}

export default Header;