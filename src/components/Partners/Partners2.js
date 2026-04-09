import React from 'react';
import './Partners2.css';

// SVG 로고 — assets/Partners/ 폴더 안에 넣어주세요
import logoKonkuk    from '../../assets/Partners/Partners_kunkook.svg';
import logoJong      from '../../assets/Partners/Partners_jong.svg';
import logoDaiso     from '../../assets/Partners/Partners_daiso.svg';
import logoModu      from '../../assets/Partners/Partners_modu.svg';
import logoKyungki   from '../../assets/Partners/Partners_kyungki.svg';
import logoSejong    from '../../assets/Partners/Partners_sejong.svg';
import logoSeoul     from '../../assets/Partners/Partners_seoul.svg';
import logoDaejun    from '../../assets/Partners/Partners_daejun.svg';
import logoKorea     from '../../assets/Partners/Partners_korea.svg';
import logoChungnam  from '../../assets/Partners/Partners_chungnam.svg';
import logoKpr       from '../../assets/Partners/Partners_kpr.svg';
import logoBugyung   from '../../assets/Partners/Partners_bugyung.svg';
import logoGukbang   from '../../assets/Partners/Partners_gukbang.svg';
import logoKoreatech from '../../assets/Partners/Partners_koreatech.svg';
import logoUseplace  from '../../assets/Partners/Partners_useplace.svg';
import logoYonsei    from '../../assets/Partners/Partners_yonsei.svg';
import logoPolice    from '../../assets/Partners/Partners_police.svg';

// 사업별 공통 설명
const DESC = {
  keying:   '중증장애인이 직접 만든\n업사이클 키링을 도입하고 있습니다.',
  routi:    '루티 앱으로 중증장애인의\n안정적인 근로 환경을 지원합니다.',
  aircon:   '전문가와 중증장애인이 협력해\n에어컨 청소를 진행합니다.',
  moving:   '중증장애인이 참여하는\n사무실·청사 이전 서비스를 진행했습니다.',
  bitzbot:  '비츠봇 설치로 플라스틱을 수거하고\n업사이클 자원 순환에 함께합니다.',
  // 복합 사업
  routiKeying: '루티 앱 도입과 업사이클 키링 제작을\n함께 진행하고 있습니다.',
  keyingBitzbot: '업사이클 키링·비츠봇 도입으로\n자원 순환에 함께하고 있습니다.',
  routiBitzbot: '루티 앱으로 근로 효율을 높이고\n비츠봇으로 플라스틱 수거도 함께합니다.',
  routiKeyingBitzbot: '루티 앱·업사이클 키링·비츠봇을 함께 도입해\n장애인 일자리와 자원 순환에 함께합니다.',
};

const PARTNERS = [
  { id: 1,  logo: logoKonkuk,    name: '건국대학교병원',           desc: DESC.routiBitzbot   }, // 루티 + 비츠봇
  { id: 2,  logo: logoJong,      name: '종근당',                   desc: DESC.routiKeying    }, // 루티 + 업사이클 키링
  { id: 3,  logo: logoDaiso,     name: '다이소',                   desc: DESC.routiKeyingBitzbot }, // 루티 + 업사이클 키링 + 비츠봇
  { id: 4,  logo: logoModu,      name: '모두투어',                 desc: DESC.routi          }, // 루티
  { id: 5,  logo: logoKyungki,   name: '경기도교육청',             desc: DESC.aircon         }, // 에어컨 청소
  { id: 6,  logo: logoSejong,    name: '세종특별자치시교육청',     desc: DESC.aircon         }, // 에어컨 청소
  { id: 7,  logo: logoSeoul,     name: '서울시설공단',             desc: DESC.aircon         }, // 에어컨 청소
  { id: 8,  logo: logoDaejun,    name: '대전광역시교육청',         desc: DESC.aircon         }, // 에어컨 청소
  { id: 9,  logo: logoKorea,     name: '대한민국국회',             desc: DESC.aircon         }, // 에어컨 청소
  { id: 10, logo: logoChungnam,  name: '충남대학교',               desc: DESC.moving         }, // 이사
  { id: 11, logo: logoKpr,       name: 'KPR',                      desc: DESC.keying         }, // 업사이클 키링
  { id: 12, logo: logoBugyung,   name: '국립부경대학교',           desc: DESC.moving         }, // 이사
  { id: 13, logo: logoGukbang,   name: '국방홍보원',               desc: DESC.moving         }, // 이사
  { id: 14, logo: logoKoreatech, name: '한국정보기술단',           desc: DESC.routi          }, // 루티
  { id: 15, logo: logoUseplace,  name: '유즈플레이스',             desc: DESC.routi          }, // 루티
  { id: 16, logo: logoYonsei,    name: '연세올바른재활의학과의원', desc: DESC.keying         }, // 업사이클 키링
  { id: 17, logo: logoPolice,    name: '서울종암경찰서',           desc: DESC.moving         }, // 이사
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