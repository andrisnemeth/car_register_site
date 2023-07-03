import axios from "axios";
import { getAuthData } from "../helpers/auth";

export async function fetchUserReqs() {
  const response = await axios.get("http://localhost:8000/user-reqs");
  return response.data;
}

export async function addNewReq(reqData) {
  try {
    const userId = localStorage.getItem("userId");
    console.log(localStorage)

    const token = localStorage.getItem("token");
    console.log(token, userId);

    getAuthData();

    const dateATM = new Date().toLocaleString();
    const response = await axios.post("http://localhost:8000/user-reqs", {
      userId: userId,
      reqContent: reqData.reqContent,
      datePosted: dateATM,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data.message);
  }
}
