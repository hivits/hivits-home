import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { supabase } from '../../supabase';
import './AdminInquiryDetail.css';

function AdminInquiryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState('');
  const [sendStatus, setSendStatus] = useState('');

  useEffect(() => {
    const fetchInquiry = async () => {
      const { data } = await supabase.from('inquiries').select('*').eq('id', id).single();
      if (data) {
        setInquiry(data);
        if (data.reply) setReply(data.reply);
      }
      setLoading(false);
    };
    fetchInquiry();
  }, [id]);

  const formatDate = (str) => {
    if (!str) return '-';
    const d = new Date(str);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  const handleSendReply = async () => {
    if (!reply.trim()) return;
    setSendStatus('sending');
    try {
      // EmailJS로 문의자에게 직접 발송
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

      // Supabase 상태 업데이트
      await supabase.from('inquiries').update({
        status: 'replied',
        reply,
        replied_at: new Date().toISOString(),
      }).eq('id', id);

      setInquiry((prev) => ({ ...prev, status: 'replied', reply }));
      setSendStatus('success');
    } catch (err) {
      console.error(err);
      setSendStatus('error');
    }
  };

  if (loading) return <div className="inquiry-detail__loading">불러오는 중...</div>;
  if (!inquiry) return <div className="inquiry-detail__loading">문의를 찾을 수 없습니다.</div>;

  return (
    <div className="inquiry-detail">
      <header className="inquiry-detail__header">
        <button className="inquiry-detail__back" onClick={() => navigate('/admin')}>← 목록으로</button>
        <span className={`inquiry-detail__badge inquiry-detail__badge--${inquiry.status}`}>
          {inquiry.status === 'new' ? '신규' : '답변 완료'}
        </span>
      </header>

      <main className="inquiry-detail__main">
        <section className="inquiry-detail__card">
          <h2 className="inquiry-detail__section-title">문의자 정보</h2>
          <div className="inquiry-detail__info-grid">
            {[
              ['성함', inquiry.name],
              ['소속', inquiry.company],
              ['연락처', inquiry.phone],
              ['이메일', inquiry.email],
              ['접수일시', formatDate(inquiry.created_at)],
              ...(inquiry.replied_at ? [['답변일시', formatDate(inquiry.replied_at)]] : []),
            ].map(([label, value]) => (
              <div className="inquiry-detail__info-item" key={label}>
                <span className="inquiry-detail__info-label">{label}</span>
                <span className="inquiry-detail__info-value">{value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="inquiry-detail__card">
          <h2 className="inquiry-detail__section-title">문의 내용</h2>
          <p className="inquiry-detail__message">{inquiry.message}</p>
        </section>

        <section className="inquiry-detail__card">
          <h2 className="inquiry-detail__section-title">
            답변 작성
            <span className="inquiry-detail__send-hint">작성 후 발송하면 문의자 이메일({inquiry.email})로 전달됩니다.</span>
          </h2>
          <textarea
            className="inquiry-detail__reply-textarea"
            placeholder="답변 내용을 입력해주세요."
            value={reply}
            onChange={(e) => { setReply(e.target.value); if (sendStatus) setSendStatus(''); }}
          />
          <div className="inquiry-detail__reply-footer">
            {sendStatus === 'success' && <span className="inquiry-detail__status inquiry-detail__status--success">✅ 답변이 성공적으로 발송되었습니다.</span>}
            {sendStatus === 'error' && <span className="inquiry-detail__status inquiry-detail__status--error">❌ 발송에 실패했습니다. 다시 시도해주세요.</span>}
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
