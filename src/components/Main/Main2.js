import { Link } from 'react-router-dom';
import hivisImg from '../../assets/img_hivits.png';
import arrowIcon from '../../assets/icon_arrow.svg';
import arrowHoverIcon from '../../assets/icon_arrow_hover.svg';
import './Main2.css';

function Main2() {
  return (
    <section className="main2">
      <div className="main2__inner">

        {/* 왼쪽 이미지 */}
        <div className="main2__img-wrap">
          <img src={hivisImg} alt="하이비츠 팀" className="main2__img" />
        </div>

        {/* 오른쪽 텍스트 */}
        <div className="main2__content">
          <h2 className="main2__title">
            기술로 사람과 환경의<br />더 나은 내일을 만들어 갑니다
          </h2>
          <p className="main2__desc">
            하이비츠는 2020년 설립된 장애인표준사업장 인증 기업입니다.<br />
            AI 기술을 통해 중증장애인에게 안정적인 일자리를 만들고,<br />
            환경 문제를 해결하며, 사람과 반려동물이 함께 행복한 세상을 만들어갑니다.
          </p>
          <Link to="/about" className="main2__btn">
            <span className="main2__btn-text">About Hivits</span>
            <div className="main2__btn-icon-wrap">
              <img src={arrowIcon}      alt="arrow" className="icon-default" />
              <img src={arrowHoverIcon} alt="arrow" className="icon-hover"   style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}

export default Main2;