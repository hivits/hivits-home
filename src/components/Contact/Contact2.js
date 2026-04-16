import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import iconCheckbox from '../../assets/icon_checkbox.svg';
import './Contact2.css';

function Contact2() {
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    name: '', company: '', phone: '', email: '', message: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(''); // 'sending' | 'success' | 'error'

  const validate = (data, isAgreed) => {
    const newErrors = {};
    if (!data.name.trim()) newErrors.name = '성함을 입력해주세요.';
    if (!data.company.trim()) newErrors.company = '소속을 입력해주세요.';
    if (!data.phone.trim()) newErrors.phone = '연락처를 입력해주세요.';
    if (!data.email.trim()) newErrors.email = '이메일을 입력해주세요.';
    if (!data.message.trim()) newErrors.message = '문의 내용을 입력해주세요.';
    if (!isAgreed) newErrors.agreed = '개인정보 수집 및 이용에 동의해주세요.';
    return newErrors;
  };

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    if (errors[e.target.name]) {
      const newErrors = { ...errors };
      if (updated[e.target.name].trim()) delete newErrors[e.target.name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async () => {
    const newErrors = validate(form, agreed);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('sending');
    try {
      await addDoc(collection(db, 'inquiries'), {
        name: form.name,
        company: form.company,
        phone: form.phone,
        email: form.email,
        message: form.message,
        status: 'new',
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setForm({ name: '', company: '', phone: '', email: '', message: '' });
      setAgreed(false);
      setErrors({});
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
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
              <input className={`contact-form__input${errors.name ? ' contact-form__input--error' : ''}`} type="text" name="name"
                placeholder="성함을 입력해주세요." value={form.name} onChange={handleChange} />
              {errors.name && <span className="contact-form__error-msg">{errors.name}</span>}
            </div>
            <div className="contact-form__field">
              <label className="contact-form__label">소속 <span className="contact-form__required">*</span></label>
              <input className={`contact-form__input${errors.company ? ' contact-form__input--error' : ''}`} type="text" name="company"
                placeholder="소속 회사를 입력해주세요." value={form.company} onChange={handleChange} />
              {errors.company && <span className="contact-form__error-msg">{errors.company}</span>}
            </div>
          </div>

          {/* 연락처 / 이메일 */}
          <div className="contact-form__row">
            <div className="contact-form__field">
              <label className="contact-form__label">연락처 <span className="contact-form__required">*</span></label>
              <input className={`contact-form__input${errors.phone ? ' contact-form__input--error' : ''}`} type="text" name="phone"
                placeholder="연락처를 입력해주세요." value={form.phone} onChange={handleChange} />
              {errors.phone && <span className="contact-form__error-msg">{errors.phone}</span>}
            </div>
            <div className="contact-form__field">
              <label className="contact-form__label">이메일 <span className="contact-form__required">*</span></label>
              <input className={`contact-form__input${errors.email ? ' contact-form__input--error' : ''}`} type="email" name="email"
                placeholder="이메일을 입력해주세요." value={form.email} onChange={handleChange} />
              {errors.email && <span className="contact-form__error-msg">{errors.email}</span>}
            </div>
          </div>

          {/* 문의 내용 */}
          <div className="contact-form__field contact-form__field--full">
            <label className="contact-form__label">문의 내용 <span className="contact-form__required">*</span></label>
            <textarea className={`contact-form__textarea${errors.message ? ' contact-form__input--error' : ''}`} name="message"
              placeholder="문의하실 내용을 입력해주세요." value={form.message} onChange={handleChange} />
            {errors.message && <span className="contact-form__error-msg">{errors.message}</span>}
          </div>

          {/* 개인정보 동의 + 문의하기 버튼 */}
          <div className="contact-form__footer">
            <div className={`contact-form__agree ${agreed ? 'contact-form__agree--checked' : ''}${errors.agreed ? ' contact-form__agree--error' : ''}`}
              onClick={() => {
                const next = !agreed;
                setAgreed(next);
                if (next && errors.agreed) {
                  const newErrors = { ...errors };
                  delete newErrors.agreed;
                  setErrors(newErrors);
                }
              }}>
              <div className="contact-form__checkbox-wrap">
                <img src={iconCheckbox} alt="체크박스" className="contact-form__checkbox-icon" />
              </div>
              <span className="contact-form__agree-text">개인정보 수집 및 이용에 동의합니다.*</span>
            </div>
            {errors.agreed && <span className="contact-form__error-msg" style={{ marginTop: '8px' }}>{errors.agreed}</span>}

            {/* 상태 메시지 */}
            <div style={{ height: '40px', marginTop: '16px' }}>
              {status === 'success' && <p style={{ color: 'green', margin: 0 }}>✅ 문의가 성공적으로 접수되었습니다! 빠른 시일 내에 답변 드리겠습니다.</p>}
              {status === 'error' && <p style={{ color: 'red', margin: 0 }}>❌ 접수 실패. 다시 시도해주세요.</p>}
            </div>
            <div className="contact-form__btn-row">
              <button className="contact-form__btn" onClick={handleSubmit} disabled={status === 'sending'}>
                {status === 'sending' ? '접수 중...' : '문의하기'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact2;
