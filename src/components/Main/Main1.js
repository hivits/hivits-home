import heroImg from '../../assets/img_hero.png';
import './Main1.css';

function Main1() {
  return (
    <section className="main1">
      <div
        className="main1__hero"
        style={{
          backgroundImage: `url(${heroImg})`,
        }}
      >
        {/* ✨ 텍스트 슬라이드업을 위한 overflow hidden 래퍼 */}
        <div className="main1__hero-text-wrapper">
          <p className="main1__hero-text">
            {"하이비츠는\n기술로 사랑을 실현합니다."}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Main1;