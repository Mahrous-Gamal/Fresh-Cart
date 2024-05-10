
import { jwtDecode } from "jwt-decode";
import { Navigate } from 'react-router-dom';

export default function Gard(props) {
  const token = localStorage.getItem('token')
  try {
    const decoded = jwtDecode(token);
  }
  catch (err) {
    localStorage.clear()
    return <Navigate to='/signin'/>
  }
  if (token) return props.children
  return <Navigate to="/signin" />;
}
