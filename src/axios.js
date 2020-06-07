import axios from "axios";

const token = window.localStorage.getItem("auth");

const instance = axios.create({
  baseURL: "https://safe-gorge-81968.herokuapp.com",
});

if (token) {
  instance.defaults.headers.common["x-access-token"] = token;
}

instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
