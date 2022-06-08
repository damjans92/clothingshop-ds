import axios from "axios";

const BASE_URL = "https://clothingshop-ds.herokuapp.com/api";
let token = "";
function TOKEN() {
  if (
    JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
      .currentUser?.accessToken
  ) {
    token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
      .currentUser?.accessToken;
  } else {
    token = "";
  }
}
TOKEN();
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${token}` },
});
