import axios from "axios";
import jwtDecode from "jwt-decode";

function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

function saveToken(token) {
  localStorage.setItem("token", token);
  setAuthToken(token);
}

function removeToken() {
  localStorage.removeItem("token");
  setAuthToken(null);
}

function getCurrentUser() {
  const token = localStorage.getItem("token");
  console.log("token:", token);

  if (token) {
    const decodedToken = jwtDecode(token);
    console.log("decodedToken:", decodedToken);
    return decodedToken;
  }
  return null;
}

function getCurrentUserId() {
  const token = localStorage.getItem("token");
  console.log("token:", token);

  if (token) {
    const decodedToken = jwtDecode(token);
    console.log("decodedToken:", decodedToken);
    const userId = JSON.parse(localStorage.getItem("userId"));
    console.log(userId);
    return userId;
  }
  return null;
}

// LocalStorage
function storeAuthData(token, userId) {
  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);
}

function getAuthData() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  return { token, userId };
}

export {
  saveToken,
  removeToken,
  getCurrentUser,
  getCurrentUserId,
  storeAuthData,
  getAuthData,
};
