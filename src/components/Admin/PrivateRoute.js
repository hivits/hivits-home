import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const isAuthed = sessionStorage.getItem('admin_authed') === 'true';
  return isAuthed ? children : <Navigate to="/admin/login" replace />;
}

export default PrivateRoute;
