import axios, { AxiosError } from "axios";
import jwt_decode from "jwt-decode";

export async function fetchUsers() {
  const response = await axios.get("http://localhost:8000/users");
  return response.data;
}


export async function postRegister(userData) {
  try {
    const response = await axios.post("http://localhost:8000/register", {
      email: userData.email,
      fullName: userData.fullName,
      username: userData.username,
      password: userData.password,
      typeOfUser: "user",
      isActive: 1,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
      console.log(error.response?.data.error);
      throw new Error(error.response?.data.error);
    }
  }
}

export async function postLogin(credentials) {
  console.log(credentials);

  try {
    const response = await axios.post(
      "http://localhost:8000/login",
      credentials
    );
    if (response.status === 200) {
      const data = response.data;
      const userId = data.userId;

      localStorage.setItem("userId", userId);
      console.log(localStorage.getItem('userId'))

      console.log( { responseData: data, userId})
      return { responseData: data, userId} 
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      throw new Error(error.response?.data.message);
    }
  }
}

export async function postLoginAdmin(credentials) {
  console.log(credentials);

  try {
    const response = await axios.post(
      "http://localhost:8000/login-admin",
      credentials
    );
    if (response.status === 200) {
      const data = response.data;
      const userId = data.userId;

      localStorage.setItem("userId", userId);
      console.log(localStorage.getItem('userId'))

      console.log( { responseData: data, userId})
      return { responseData: data, userId} 
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      throw new Error(error.response?.data.message);
    }
  }
}