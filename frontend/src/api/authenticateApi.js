import axios from "axios";
const baseURL = "http://localhost:3001/api/user/";

export const signUp = async (user) => {
  console.log(user)
  try {
    await axios.post(baseURL + "register", ({
      userId: user.userId,
      userName: user.userName,
      password: user.password,
      phone: user.phone,
      email: user.email,
    }));
  } catch (error) {
    console.log(error);
  }
};

export const logIn = async (userId, password) => {
  try {
    await axios.post(baseURL + "login", {
      userId: userId,
      password: password,
    });
  } catch (error) {
    console.log(error);
  }
};
