import numberImg from '../../assets/img_number.png';
import './Main4.css';

const STATS = [
  { id: 1, cls: 'card1', label: '전국 비츠봇\n설치 기관 수',          number: '50',   unit: '개'  },
  { id: 2, cls: 'card2', label: '루티를 통해 일하는\n중증장애인 근로자 수', number: '200',  unit: '명'  },
  { id: 3, cls: 'card3', label: '누적 수거된\n펫트병 수',              number: '1200', unit: '개'  },
  { id: 4, cls: 'card4', label: '루티 도입 시 장애인\n고용부담금 감면 혜택', number: '90%',  unit: '최대' },
];

function Main4() {
  return (
    <section className="main4">
      <div
        className="main4__bg"
        style={{ backgroundImage: `url(${numberImg})` }}
      >
        <h2 className="main4__title">숫자로 보는 하이비츠의 변화</h2>

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
    </section>
  );
}

export default Main4;