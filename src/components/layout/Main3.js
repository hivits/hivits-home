import beforeIcon from '../../assets/icon_before.svg';
import nextIcon from '../../assets/icon_next.svg';
import './Main3.css';

function Main3() {
  return (
    <section className="main3">
      <div className="main3__inner">

        {/* 상단: 텍스트 + 버튼 행 */}
        <div className="main3__top">
          <div className="main3__top-left">
            <h2 className="main3__title font06">
              더 나은 세상을 향한<br />하이비츠의 다섯 가지 이야기
            </h2>
            <a href="#" className="main3__btn">
              <span className="main3__btn-text">Business</span>
              <img
                src={nextIcon}
                alt="arrow"
                className="main3__btn-icon"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </a>
          </div>

          {/* 오른쪽: 이전/다음 버튼 */}
          <div className="main3__nav-btns">
            <button className="main3__nav-btn main3__nav-btn--prev">
              <img src={beforeIcon} alt="이전" />
            </button>
            <button className="main3__nav-btn main3__nav-btn--next">
              <img src={nextIcon} alt="다음" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Main3;