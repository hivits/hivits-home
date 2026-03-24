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
        <p className="main1__hero-text">
          {"하이비츠는\n기술로 사랑을 실현합니다."}
        </p>
      </div>
    </section>
  );
}

export default Main1;