import axios, { AxiosError } from "axios";

//fetch users for list
export async function fetchUsers() {
  const response = await axios.get("http://localhost:8000/users");
  return response.data;
}

export async function fetchChangedTypeUsers() {
  const response = await axios.get("http://localhost:8000/users-changed-typed");
  return response.data;
}

//edit user type to be admin
export async function editTypeOfUserById(id, typeOfUser) {
  try {
    const response = await axios.patch(`http://localhost:8000/users/${id}`, {
      typeOfUser: typeOfUser,
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

//registration
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
//login
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
      console.log(localStorage.getItem("userId"));

      console.log({ responseData: data, userId });
      return { responseData: data, userId };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      throw new Error(error.response?.data.message);
    }
  }
}
//loginadmin
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
      console.log(localStorage.getItem("userId"));

      console.log({ responseData: data, userId });
      return { responseData: data, userId };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      throw new Error(error.response?.data.message);
    }
  }
}

//logout
export async function postLogout() {
  try {
    const response = await axios.post("http://localhost:8000/logout");
    if (response.status === 200) {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
    }
  } catch (error) {
    console.log(error);
  }
}

//delete user
export async function deleteUserById(id) {
  try {
    const response = await axios.delete(`http://localhost:8000/users/${id}`);
    if (response.status === 200 || response.status === 204) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
