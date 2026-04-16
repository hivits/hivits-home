import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../../firebase';
import './AdminDashboard.css';

function AdminDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all' | 'new' | 'replied'
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setInquiries(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const filtered = filter === 'all'
    ? inquiries
    : inquiries.filter((i) => i.status === filter);

  const newCount = inquiries.filter((i) => i.status === 'new').length;

  const formatDate = (ts) => {
    if (!ts) return '-';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className="admin-dash">
      {/* 헤더 */}
      <header className="admin-dash__header">
        <div className="admin-dash__header-left">
          <span className="admin-dash__logo">HIVITS</span>
          <span className="admin-dash__header-title">문의 관리</span>
        </div>
        <button className="admin-dash__logout" onClick={handleLogout}>로그아웃</button>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="admin-dash__main">
        {/* 통계 카드 */}
        <div className="admin-dash__stats">
          <div className="admin-dash__stat-card">
            <span className="admin-dash__stat-label">전체 문의</span>
            <span className="admin-dash__stat-value">{inquiries.length}</span>
          </div>
          <div className="admin-dash__stat-card admin-dash__stat-card--new">
            <span className="admin-dash__stat-label">신규 문의</span>
            <span className="admin-dash__stat-value">{newCount}</span>
          </div>
          <div className="admin-dash__stat-card">
            <span className="admin-dash__stat-label">답변 완료</span>
            <span className="admin-dash__stat-value">{inquiries.length - newCount}</span>
          </div>
        </div>

        {/* 필터 탭 */}
        <div className="admin-dash__filters">
          {[['all', '전체'], ['new', '신규'], ['replied', '답변 완료']].map(([val, label]) => (
            <button
              key={val}
              className={`admin-dash__filter-btn${filter === val ? ' admin-dash__filter-btn--active' : ''}`}
              onClick={() => setFilter(val)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 문의 목록 */}
        {loading ? (
          <div className="admin-dash__empty">불러오는 중...</div>
        ) : filtered.length === 0 ? (
          <div className="admin-dash__empty">문의가 없습니다.</div>
        ) : (
          <div className="admin-dash__table-wrap">
            <table className="admin-dash__table">
              <thead>
                <tr>
                  <th>상태</th>
                  <th>성함</th>
                  <th>소속</th>
                  <th>이메일</th>
                  <th>연락처</th>
                  <th>접수일시</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="admin-dash__row"
                    onClick={() => navigate(`/admin/inquiry/${item.id}`)}
                  >
                    <td>
                      <span className={`admin-dash__badge admin-dash__badge--${item.status}`}>
                        {item.status === 'new' ? '신규' : '답변 완료'}
                      </span>
                    </td>
                    <td className="admin-dash__name">{item.name}</td>
                    <td>{item.company}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td className="admin-dash__date">{formatDate(item.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
