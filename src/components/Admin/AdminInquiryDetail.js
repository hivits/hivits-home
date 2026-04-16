import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { db } from '../../firebase';
import './AdminInquiryDetail.css';

function AdminInquiryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState('');
  const [sendStatus, setSendStatus] = useState(''); // '' | 'sending' | 'success' | 'error'

  useEffect(() => {
    const fetchInquiry = async () => {
      const ref = doc(db, 'inquiries', id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setInquiry({ id: snap.id, ...snap.data() });
        if (snap.data().reply) setReply(snap.data().reply);
      }
      setLoading(false);
    };
    fetchInquiry();
  }, [id]);

  const formatDate = (ts) => {
    if (!ts) return '-';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  const handleSendReply = async () => {
    if (!reply.trim()) return;
    setSendStatus('sending');
    try {
      // EmailJS로 문의자에게 답변 발송
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_REPLY_TEMPLATE_ID,
        {
          to_name: inquiry.name,
          to_email: inquiry.email,
          original_message: inquiry.message,
          reply_message: reply,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      // Firestore 상태 업데이트
      const ref = doc(db, 'inquiries', id);
      await updateDoc(ref, {
        status: 'replied',
        reply: reply,
        repliedAt: serverTimestamp(),
      });

      setInquiry((prev) => ({ ...prev, status: 'replied', reply }));
      setSendStatus('success');
    } catch (err) {
      console.error(err);
      setSendStatus('error');
    }
  };

  if (loading) {
    return <div className="inquiry-detail__loading">불러오는 중...</div>;
  }

  if (!inquiry) {
    return <div className="inquiry-detail__loading">문의를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="inquiry-detail">
      {/* 헤더 */}
      <header className="inquiry-detail__header">
        <button className="inquiry-detail__back" onClick={() => navigate('/admin')}>
          ← 목록으로
        </button>
        <span className={`inquiry-detail__badge inquiry-detail__badge--${inquiry.status}`}>
          {inquiry.status === 'new' ? '신규' : '답변 완료'}
        </span>
      </header>

      <main className="inquiry-detail__main">
        {/* 문의 정보 */}
        <section className="inquiry-detail__card">
          <h2 className="inquiry-detail__section-title">문의자 정보</h2>
          <div className="inquiry-detail__info-grid">
            <div className="inquiry-detail__info-item">
              <span className="inquiry-detail__info-label">성함</span>
              <span className="inquiry-detail__info-value">{inquiry.name}</span>
            </div>
            <div className="inquiry-detail__info-item">
              <span className="inquiry-detail__info-label">소속</span>
              <span className="inquiry-detail__info-value">{inquiry.company}</span>
            </div>
            <div className="inquiry-detail__info-item">
              <span className="inquiry-detail__info-label">연락처</span>
              <span className="inquiry-detail__info-value">{inquiry.phone}</span>
            </div>
            <div className="inquiry-detail__info-item">
              <span className="inquiry-detail__info-label">이메일</span>
              <span className="inquiry-detail__info-value">{inquiry.email}</span>
            </div>
            <div className="inquiry-detail__info-item">
              <span className="inquiry-detail__info-label">접수일시</span>
              <span className="inquiry-detail__info-value">{formatDate(inquiry.createdAt)}</span>
            </div>
            {inquiry.repliedAt && (
              <div className="inquiry-detail__info-item">
                <span className="inquiry-detail__info-label">답변일시</span>
                <span className="inquiry-detail__info-value">{formatDate(inquiry.repliedAt)}</span>
              </div>
            )}
          </div>
        </section>

        {/* 문의 내용 */}
        <section className="inquiry-detail__card">
          <h2 className="inquiry-detail__section-title">문의 내용</h2>
          <p className="inquiry-detail__message">{inquiry.message}</p>
        </section>

        {/* 답변 작성 */}
        <section className="inquiry-detail__card">
          <h2 className="inquiry-detail__section-title">
            답변 작성
            <span className="inquiry-detail__send-hint">작성 후 발송하면 문의자 이메일({inquiry.email})로 전달됩니다.</span>
          </h2>
          <textarea
            className="inquiry-detail__reply-textarea"
            placeholder="답변 내용을 입력해주세요."
            value={reply}
            onChange={(e) => {
              setReply(e.target.value);
              if (sendStatus) setSendStatus('');
            }}
          />

          <div className="inquiry-detail__reply-footer">
            {sendStatus === 'success' && (
              <span className="inquiry-detail__status inquiry-detail__status--success">
                ✅ 답변이 성공적으로 발송되었습니다.
              </span>
            )}
            {sendStatus === 'error' && (
              <span className="inquiry-detail__status inquiry-detail__status--error">
                ❌ 발송에 실패했습니다. 다시 시도해주세요.
              </span>
            )}
            <button
              className="inquiry-detail__send-btn"
              onClick={handleSendReply}
              disabled={sendStatus === 'sending' || !reply.trim()}
            >
              {sendStatus === 'sending' ? '발송 중...' : '답변 발송'}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminInquiryDetail;
