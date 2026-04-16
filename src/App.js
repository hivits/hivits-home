import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './index.css';
import iconBtn from './assets/icon_btn.svg';

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Main1 from "./components/Main/Main1";
import Main2 from "./components/Main/Main2";
import Main3 from "./components/Main/Main3";
import Main4 from "./components/Main/Main4";
import Main5 from "./components/Main/Main5";
import About1 from "./components/About/About1";
import About2 from "./components/About/About2";
import About3 from "./components/About/About3";
import About4 from "./components/About/About4";
import About5 from "./components/About/About5";
import About6 from "./components/About/About6";
import About7 from "./components/About/About7";
import Business1 from "./components/Business/Business1";
import Business2 from "./components/Business/Business2";
import Partners1 from "./components/Partners/Partners1";
import Partners2 from "./components/Partners/Partners2";
import Contact1 from "./components/Contact/Contact1";
import Contact2 from "./components/Contact/Contact2";
import Privacy from "./components/Privacy/Privacy";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminInquiryDetail from "./components/Admin/AdminInquiryDetail";
import PrivateRoute from "./components/Admin/PrivateRoute";

/* =====================
   맨 위로 버튼 컴포넌트
===================== */
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isOverFooter, setIsOverFooter] = useState(false);

  useEffect(() => {
    // 스크롤 200px 이상이면 버튼 표시
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
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
    );
  }

  return (
    <>
      <Header />

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