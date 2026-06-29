import numberImg from '../../assets/img_number.webp';
import './Main4.css';

const STATS = [
  { id: 1, cls: 'card1', label: '전국 비츠봇\n설치 기관 수',             number: '30',   unit: '개'  },
  { id: 2, cls: 'card2', label: '루티를 통해 일하는\n중증장애인 근로자 수', number: '200',  unit: '명'  },
  { id: 3, cls: 'card3', label: '누적 수거된\n펫트병 수',                number: '10만 +', unit: '약'  },
  { id: 4, cls: 'card4', label: '하이비츠와 함께하면 나타나는 장애인 고용부담금 절감 효과', number: '60%',  unit: '약' },
];

function Main4() {
  return (
    <section className="main4">
      <div
        className="main4__bg"
        style={{ backgroundImage: `url(${numberImg})` }}
      >
        <h2 className="main4__title">숫자로 보는 하이비츠의 변화</h2>

        <div className="main4__grid">
          {STATS.map((stat) => (
            <div key={stat.id} className={`main4__card main4__${stat.cls}`}>
              <p className="main4__card-label">{stat.label}</p>
              <div className="main4__card-number-wrap">
                <span className="main4__card-number">{stat.number}</span>
                <span className="main4__card-unit">{stat.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Main4;