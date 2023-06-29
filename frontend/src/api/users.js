import { AxiosError } from "axios";
import axios from "axios";

export async function fetchUsers() {
  const response = await axios.get("http://localhost:8000/users");
  console.log(response.data);
  return response.data;
}

export async function postRegister(userData) {
  try {
    const response = await axios.post("http://localhost:8000/register", {
      email: userData.email,
      fullName: userData.fullName,
      username: userData.username,
      password: userData.password,
      typeOfUser: userData.typeOfUser,
      isActive: userData.isActive,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      throw new Error(error.response?.data.message);
    }
  }
}


export async function postLogin(credentials) {
  console.log(credentials)

  try {
    const response = await axios.post('http://localhost:8000/login', credentials);
    console.log(response.data)
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      throw new Error(error.response?.data.message);
    }
  }
}