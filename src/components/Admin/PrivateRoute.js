import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

function PrivateRoute({ children }) {
  const [status, setStatus] = useState('loading'); // 'loading' | 'authed' | 'unauthed'

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setStatus(user ? 'authed' : 'unauthed');
    });
    return () => unsubscribe();
  }, []);

  if (status === 'loading') {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', fontFamily: 'Pretendard, sans-serif', color: '#A3A3A3'
      }}>
        로딩 중...
      </div>
    );
  }

  return status === 'authed' ? children : <Navigate to="/admin/login" replace />;
}

export default PrivateRoute;
