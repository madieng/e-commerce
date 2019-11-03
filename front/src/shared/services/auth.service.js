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
    console.log("ERROR", error);
  }
};

export default {
  login
};
