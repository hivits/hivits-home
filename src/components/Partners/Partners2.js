import React from 'react';
import './Partners2.css';

// SVG 로고 — assets/Partners/ 폴더 안에 넣어주세요
import logoKonkuk  from '../../assets/Partners/Partners_kunkook.svg';
import logoJong    from '../../assets/Partners/Partners_jong.svg';
import logoDaiso   from '../../assets/Partners/Partners_daiso.svg';
import logoModu    from '../../assets/Partners/Partners_modu.svg';
import logoKyungki from '../../assets/Partners/Partners_kyungki.svg';
import logoSejong  from '../../assets/Partners/Partners_sejong.svg';
import logoSeoul   from '../../assets/Partners/Partners_seoul.svg';
import logoDaejun  from '../../assets/Partners/Partners_daejun.svg';
import logoHana    from '../../assets/Partners/Partners_hana.svg';
import logoKorea   from '../../assets/Partners/Partners_korea.svg';
import logoEdu     from '../../assets/Partners/Partners_edu.svg';

const PARTNERS = [
  { id: 1,  logo: logoKonkuk,  name: '건국대학교병원',       desc: '약 200명의 장애인 근로자를\n루티를 통해 근로시키고 있습니다.' },
  { id: 2,  logo: logoJong,    name: '종근당',               desc: '약 200명의 장애인 근로자를\n루티를 통해 근로시키고 있습니다.' },
  { id: 3,  logo: logoDaiso,   name: '다이소',               desc: '약 200명의 장애인 근로자를\n루티를 통해 근로시키고 있습니다.' },
  { id: 4,  logo: logoModu,    name: '모두투어',             desc: '약 200명의 장애인 근로자를\n루티를 통해 근로시키고 있습니다.' },
  { id: 5,  logo: logoKyungki, name: '경기도교육청',         desc: '약 200명의 장애인 근로자를\n루티를 통해 근로시키고 있습니다.' },
  { id: 6,  logo: logoSejong,  name: '세종특별자치시교육청', desc: '약 200명의 장애인 근로자를\n루티를 통해 근로시키고 있습니다.' },
  { id: 7,  logo: logoSeoul,   name: '서울시설공단',         desc: '약 200명의 장애인 근로자를\n루티를 통해 근로시키고 있습니다.' },
  { id: 8,  logo: logoDaejun,  name: '대전광역시교육청',     desc: '약 200명의 장애인 근로자를\n루티를 통해 근로시키고 있습니다.' },
  { id: 9,  logo: logoHana,    name: '하나투어',             desc: '약 200명의 장애인 근로자를\n루티를 통해 근로시키고 있습니다.' },
  { id: 10, logo: logoKorea,   name: '대한민국국회',         desc: '약 200명의 장애인 근로자를\n루티를 통해 근로시키고 있습니다.' },
  { id: 11, logo: logoEdu,     name: '경기도교육청',         desc: '약 200명의 장애인 근로자를\n루티를 통해 근로시키고 있습니다.' },
  { id: 12, logo: logoJong,    name: '종근당',               desc: '약 200명의 장애인 근로자를\n루티를 통해 근로시키고 있습니다.' },
];

function Partners2() {
  return (
    <section className="partners-list">
      <div className="partners-list__inner">
        <h2 className="partners-list__title">하이비츠와 함께하는 협력사들</h2>

        <div className="partners-list__grid">
          {PARTNERS.map((partner) => (
            <div className="partners-list__card" key={partner.id}>
              {/* 앞면: 로고 */}
              <div className="partners-list__card-front">
                <img src={partner.logo} alt={partner.name} className="partners-list__logo" />
              </div>
              {/* 뒷면: 로고명 + 설명 */}
              <div className="partners-list__card-back">
                <p className="partners-list__card-name">{partner.name}</p>
                <p className="partners-list__card-desc">{partner.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Partners2;