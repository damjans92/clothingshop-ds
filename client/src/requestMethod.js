import axios from "axios";

const BASE_URL = "https://clothingshop-ds.herokuapp.com/api";
let token = "";
function getToken() {
  if (
    JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)
      ?.currentUser &&
    JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)
      ?.currentUser?.accessToken !== undefined
  ) {
    token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
      .currentUser?.accessToken;
  } else {
    token = "";
  }
  console.log(token);
}
getToken();
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  //headers: { token: `Bearer ${token}` },
});
