import axios from "axios";
const setAuthTokenAxios = (token) => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete Auth Header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthTokenAxios;
