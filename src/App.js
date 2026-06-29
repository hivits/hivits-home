import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import './index.css';
import iconBtn from './assets/icon_btn.svg';

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PrivateRoute from "./components/Admin/PrivateRoute";

// 홈(첫 화면)은 즉시 로드 — 초기 렌더 깜빡임 방지
import Main1 from "./components/Main/Main1";
import Main2 from "./components/Main/Main2";
import Main3 from "./components/Main/Main3";
import Main4 from "./components/Main/Main4";
import Main5 from "./components/Main/Main5";

// 나머지 라우트는 코드 분할(지연 로드) — 초기 번들에서 제외(supabase/emailjs 포함)
const About1 = lazy(() => import("./components/About/About1"));
const About2 = lazy(() => import("./components/About/About2"));
const About3 = lazy(() => import("./components/About/About3"));
const About4 = lazy(() => import("./components/About/About4"));
const About5 = lazy(() => import("./components/About/About5"));
const About6 = lazy(() => import("./components/About/About6"));
const About7 = lazy(() => import("./components/About/About7"));
const Business1 = lazy(() => import("./components/Business/Business1"));
const Business2 = lazy(() => import("./components/Business/Business2"));
const Partners1 = lazy(() => import("./components/Partners/Partners1"));
const Partners2 = lazy(() => import("./components/Partners/Partners2"));
const Contact1 = lazy(() => import("./components/Contact/Contact1"));
const Contact2 = lazy(() => import("./components/Contact/Contact2"));
const Privacy = lazy(() => import("./components/Privacy/Privacy"));
const AdminLogin = lazy(() => import("./components/Admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./components/Admin/AdminDashboard"));
const AdminInquiryDetail = lazy(() => import("./components/Admin/AdminInquiryDetail"));

// 라우트 청크 로딩 중 자리표시 — 레이아웃 높이를 유지해 점프 방지(시각적으로 비어 있음)
function RouteFallback({ full }) {
  return <div style={{ minHeight: full ? '100vh' : '60vh' }} aria-hidden="true" />;
}

/* =====================
   맨 위로 버튼 컴포넌트
===================== */
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isOverFooter, setIsOverFooter] = useState(false);

  useEffect(() => {
    // 스크롤 200px 이상이면 버튼 표시 (rAF 스로틀 + passive 로 스크롤 부드럽게)
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsVisible(window.scrollY > 200);
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // 푸터에 닿으면 버튼 색상 변경
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsOverFooter(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 푸터 위: 흰색 배경 + 다크 아이콘 / 그 외: 다크 배경 + 흰색 아이콘
  const bgColor = isOverFooter
    ? isHovered ? 'rgba(245, 245, 245, 1)' : 'rgba(255, 255, 255, 0.7)'
    : isHovered ? 'rgba(26, 26, 26, 0.9)' : 'rgba(26, 26, 26, 0.7)';

  const borderColor = isOverFooter
    ? '1px solid rgba(26, 26, 26, 0.15)'
    : '1px solid rgba(255, 255, 255, 0.12)';

  return (
    <button
      onClick={scrollToTop}
      title="맨 위로"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        bottom: '40px',
        right: '40px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: bgColor,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: borderColor,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transition: 'opacity 0.3s ease, visibility 0.3s ease, background-color 0.2s ease, border 0.2s ease',
        zIndex: 9999,
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
      }}
    >
      <img
        src={iconBtn}
        alt="위로"
        style={{
          width: '22px',
          height: '22px',
          /* 푸터 위에선 아이콘을 다크 컬러로 반전 */
          filter: isOverFooter ? 'brightness(0)' : 'none',
          transition: 'filter 0.2s ease',
        }}
      />
    </button>
  );
}

function AppInner() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isBusinessPage = location.pathname === '/business';

  if (isAdminPage) {
    return (
      <Suspense fallback={<RouteFallback full />}>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/inquiry/:id"
            element={
              <PrivateRoute>
                <AdminInquiryDetail />
              </PrivateRoute>
            }
          />
          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <>
      <Header />

      <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Main1 />
              <Main2 />
              <Main3 />
              <Main4 />
              <Main5 />
            </main>
          }
        />

        <Route
          path="/about"
          element={
            <main>
              <About1 />
              <About2 />
              <About3 />
              <About4 />
              <About5 />
              <About6 />
              <About7 />
            </main>
          }
        />

        <Route
          path="/business"
          element={
            <main>
              <Business1 />
              <Business2 />
            </main>
          }
        />

        <Route
          path="/partners"
          element={
            <main>
              <Partners1 />
              <Partners2 />
            </main>
          }
        />

        <Route
          path="/contact"
          element={
            <main>
              <Contact1 />
              <Contact2 />
            </main>
          }
        />

        <Route
          path="/privacy"
          element={
            <main>
              <Privacy />
            </main>
          }
        />
      </Routes>
      </Suspense>

      {/* 비즈니스 페이지에서만 이미지와 푸터 사이 간격 없애기 */}
      <Footer noMargin={isBusinessPage} />

      {/* 맨 위로 버튼 - 모든 페이지에서 공통으로 표시 */}
      <ScrollToTopButton />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}

export default App;