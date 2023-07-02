import axios from "axios";
import { getCurrentUser, getCurrentUserId } from "../helpers/auth";

export async function fetchUserReqs() {
  const response = await axios.get("http://localhost:8000/user-reqs");
  return response.data;
}

export async function addNewReq(reqData) {
  console.log(reqData);

  try {
    const userId = getCurrentUserId();
    localStorage.setItem("userId", userId);

    const token = localStorage.getItem("userId");
    console.log(token, userId);

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
