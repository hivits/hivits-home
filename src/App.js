import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';

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

function AppInner() {
  const location = useLocation();
  const isBusinessPage = location.pathname === '/business';

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
      </Routes>

      {/* 비즈니스 페이지에서만 이미지와 푸터 사이 간격 없애기 */}
      <Footer noMargin={isBusinessPage} />
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