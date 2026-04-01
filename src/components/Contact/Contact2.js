import React, { useState } from 'react';
import iconCheckbox from '../../assets/icon_checkbox.svg';
import './Contact2.css';

function Contact2() {
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    name: '', company: '', phone: '', email: '', message: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section className="contact-form">
      <div className="contact-form__inner">

        {/* 왼쪽 타이틀 */}
        <div className="contact-form__left">
          <p className="contact-form__title">{"안녕하세요 하이비츠입니다.\n편하게 문의해주세요."}</p>
        </div>

        {/* 오른쪽 폼 */}
        <div className="contact-form__right">

          {/* 성함 / 소속 */}
          <div className="contact-form__row">
            <div className="contact-form__field">
              <label className="contact-form__label">성함 <span className="contact-form__required">*</span></label>
              <input
                className="contact-form__input"
                type="text"
                name="name"
                placeholder="성함을 입력해주세요."
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="contact-form__field">
              <label className="contact-form__label">소속 <span className="contact-form__required">*</span></label>
              <input
                className="contact-form__input"
                type="text"
                name="company"
                placeholder="소속 회사를 입력해주세요."
                value={form.company}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 연락처 / 이메일 */}
          <div className="contact-form__row">
            <div className="contact-form__field">
              <label className="contact-form__label">연락처 <span className="contact-form__required">*</span></label>
              <input
                className="contact-form__input"
                type="text"
                name="phone"
                placeholder="연락처를 입력해주세요."
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div className="contact-form__field">
              <label className="contact-form__label">이메일 <span className="contact-form__required">*</span></label>
              <input
                className="contact-form__input"
                type="email"
                name="email"
                placeholder="이메일을 입력해주세요."
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 문의 내용 */}
          <div className="contact-form__field contact-form__field--full">
            <label className="contact-form__label">문의 내용 <span className="contact-form__required">*</span></label>
            <textarea
              className="contact-form__textarea"
              name="message"
              placeholder="문의하실 내용을 입력해주세요."
              value={form.message}
              onChange={handleChange}
            />
          </div>

          {/* 개인정보 동의 + 문의하기 버튼 래퍼 */}
          <div className="contact-form__footer">
            {/* 개인정보 동의 */}
            <div
              className={`contact-form__agree ${agreed ? 'contact-form__agree--checked' : ''}`}
              onClick={() => setAgreed(!agreed)}
            >
              <div className="contact-form__checkbox-wrap">
                <img
                  src={iconCheckbox}
                  alt="체크박스"
                  className="contact-form__checkbox-icon"
                />
              </div>
              <span className="contact-form__agree-text">개인정보 수집 및 이용에 동의합니다.</span>
            </div>

            {/* 문의하기 버튼 */}
            <div className="contact-form__btn-row">
              <button className="contact-form__btn">문의하기</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact2;