import axios from "axios";

const login = async values => {
  try {
    const result = await axios.post(
      "http://localhost:3000/users/login",
      values
    );
    if (result.data.auth) {
      localStorage.setItem("authtoken", result.data.token);
    }
    return result.data;
  } catch (error) {
    logout();
    console.log("ERROR", error);
  }
};

const isAuthenticated = () => {
  const token = localStorage.getItem("authtoken");
  if (token) {
    return true;
  }
  return false;
};

const logout = () => {
  localStorage.removeItem("authtoken");
};

export default {
  login,
  isAuthenticated,
  logout
};
