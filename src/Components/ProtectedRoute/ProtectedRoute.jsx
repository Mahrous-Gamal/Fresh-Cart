// import React from 'react';
// import { Navigate } from 'react-router-dom';

// export default function ProtectedRoute({ children }) {
//   if (localStorage.getItem('userToken') !== null) {
//     return children;
//   } else {
//     return <Navigate to="/signin" />;
//   }
// }

import { jwtDecode } from "jwt-decode";
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {

  const token = localStorage.getItem('token')

  try {
    const decoded = jwtDecode(token);
  }
  catch (error) {
    localStorage.clear()
    return <Navigate to='/signin' />
  }
  
  if (token) return children

  return <Navigate to="/signin" />;
}
