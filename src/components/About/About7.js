import React, { useEffect, useRef } from 'react';
import logoHivits from '../../assets/logo_hivits.svg';
import './About7.css';

function About7() {
  const mapRef = useRef(null);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;

    let cancelled = false;

    const loadMap = () => {
      if (cancelled || !mapRef.current || !(window.google && window.google.maps)) return;
      const center = { lat: 37.48647, lng: 126.8932 };

      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 19,
      });

      new window.google.maps.Marker({
        position: center,
        map,
        title: "하이비츠",
      });
    };

    // 이미 로드됐거나 로딩 중인 스크립트가 있으면 재사용(중복 삽입 방지)
    const loadMapsScript = () => {
      if (window.google && window.google.maps) {
        loadMap();
        return;
      }
      const existing = document.querySelector("script[data-google-maps]");
      if (existing) {
        existing.addEventListener("load", loadMap, { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.dataset.googleMaps = "true";
      script.addEventListener("load", loadMap, { once: true });
      document.head.appendChild(script);
    };

    // 지도가 화면에 가까워질 때만 스크립트 로드(초기 로딩에서 Maps JS 제외)
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          loadMapsScript();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, []);


  return (
    <section className="about7">

      {/* 타이틀 */}
      <h2 className="about7__title">하이비츠 안내</h2>

      {/* 카드 */}
      <div className="about7__card">

        {/* 왼쪽: 구글 지도 */}
        <div className="about7__map" ref={mapRef}  />

        {/* 오른쪽: 회사 정보 */}
        <div className="about7__info">

          {/* 로고 이미지 */}
          <img
            src={logoHivits}
            alt="하이비츠 로고"
            className="about7__logo"
          />

          {/* 정보 목록 */}
          <div className="about7__details">
            <div className="about7__detail-item">
              <p className="about7__detail-label">설립연도</p>
              <p className="about7__detail-value">2020년 3월</p>
            </div>
            <div className="about7__detail-item">
              <p className="about7__detail-label">오피스 위치</p>
              <p className="about7__detail-value">서울 구로구 디지털로31길 62, 1013, 1014호 (구로동,아티스포럼)</p>
            </div>
            <div className="about7__detail-item">
              <p className="about7__detail-label">대표전화</p>
              <p className="about7__detail-value">02-3281-8880</p>
            </div>
            <div className="about7__detail-item">
              <p className="about7__detail-label">사업자번호</p>
              <p className="about7__detail-value">788-86-01781</p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

export default About7;