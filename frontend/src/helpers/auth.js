import axios from 'axios';
import jwtDecode from 'jwt-decode';

function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

function saveToken(token) {
  localStorage.setItem('token', token);
  setAuthToken(token);
}

function removeToken() {
  localStorage.removeItem('token');
  setAuthToken(null);
}

function getCurrentUser() {
  const token = localStorage.getItem('token');
  console.log('token:', token);

  if (token) {
    const decodedToken = jwtDecode(token);
    console.log('decodedToken:', decodedToken);
    return decodedToken;
  }
  return null;
}

export { saveToken, removeToken, getCurrentUser };