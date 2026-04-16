import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import logo from '../../assets/logo_hivits.svg';
import './AdminDashboard.css';

function AdminDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInquiries();

    const channel = supabase
      .channel('inquiries')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, () => {
        fetchInquiries();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // 외부 클릭 시 더보기 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchInquiries = async () => {
    const { data } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    setInquiries(data || []);
    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authed');
    navigate('/admin/login');
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('이 문의를 삭제하시겠습니까?')) return;
    await supabase.from('inquiries').delete().eq('id', id);
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    setOpenMenuId(null);
  };

  const newCount = inquiries.filter((i) => i.status === 'new').length;
  const repliedCount = inquiries.length - newCount;
  const filtered = filter === 'all' ? inquiries : inquiries.filter((i) => i.status === filter);

  const formatDate = (str) => {
    if (!str) return '-';
    const d = new Date(str);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className="admin-dash">
      <header className="admin-dash__header">
        <div className="admin-dash__header-left">
          <img src={logo} alt="HIVITS" className="admin-dash__logo" />
          <span className="admin-dash__header-title">문의 관리</span>
        </div>
        <button className="admin-dash__logout" onClick={handleLogout}>로그아웃</button>
      </header>

      <main className="admin-dash__main">
        {/* 통계 카드 — 클릭 시 필터 적용 */}
        <div className="admin-dash__stats">
          <div
            className={`admin-dash__stat-card${filter === 'all' ? ' admin-dash__stat-card--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            <span className="admin-dash__stat-label">전체 문의</span>
            <span className="admin-dash__stat-value">{inquiries.length}</span>
          </div>
          <div
            className={`admin-dash__stat-card admin-dash__stat-card--new${filter === 'new' ? ' admin-dash__stat-card--new-active' : ''}`}
            onClick={() => setFilter('new')}
          >
            <span className="admin-dash__stat-label">신규 문의</span>
            <span className="admin-dash__stat-value">{newCount}</span>
          </div>
          <div
            className={`admin-dash__stat-card${filter === 'replied' ? ' admin-dash__stat-card--active' : ''}`}
            onClick={() => setFilter('replied')}
          >
            <span className="admin-dash__stat-label">답변 완료</span>
            <span className="admin-dash__stat-value">{repliedCount}</span>
          </div>
        </div>

        {/* 현재 필터 표시 */}
        <div className="admin-dash__filter-label">
          {filter === 'all' && `전체 문의 ${inquiries.length}건`}
          {filter === 'new' && `신규 문의 ${newCount}건`}
          {filter === 'replied' && `답변 완료 ${repliedCount}건`}
        </div>

        {loading ? (
          <div className="admin-dash__empty">불러오는 중...</div>
        ) : filtered.length === 0 ? (
          <div className="admin-dash__empty">문의가 없습니다.</div>
        ) : (
          <div className="admin-dash__table-wrap" ref={menuRef}>
            <table className="admin-dash__table">
              <thead>
                <tr>
                  <th>상태</th>
                  <th>성함</th>
                  <th>소속</th>
                  <th>이메일</th>
                  <th>연락처</th>
                  <th>접수일시</th>
                  <th></th>
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
                    <td className="admin-dash__date">{formatDate(item.created_at)}</td>
                    <td className="admin-dash__more-cell" onClick={(e) => e.stopPropagation()}>
                      <button
                        className="admin-dash__more-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === item.id ? null : item.id);
                        }}
                      >
                        ···
                      </button>
                      {openMenuId === item.id && (
                        <div className="admin-dash__dropdown">
                          <button
                            className="admin-dash__dropdown-item admin-dash__dropdown-item--danger"
                            onClick={(e) => handleDelete(e, item.id)}
                          >
                            삭제하기
                          </button>
                        </div>
                      )}
                    </td>
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
