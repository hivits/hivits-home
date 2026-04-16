import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
        sessionStorage.setItem('admin_authed', 'true');
        navigate('/admin');
      } else {
        setError('비밀번호가 올바르지 않습니다.');
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <h1 className="admin-login__title">관리자 로그인</h1>
        <p className="admin-login__sub">하이비츠 문의 관리 시스템</p>

        <form className="admin-login__form" onSubmit={handleLogin}>
          <div className="admin-login__field">
            <label className="admin-login__label">비밀번호</label>
            <input
              className="admin-login__input"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="admin-login__error">{error}</p>}

          <button className="admin-login__btn" type="submit" disabled={loading}>
            {loading ? '확인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
