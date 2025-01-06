import axios from "axios";
const baseURL = "http://localhost:3001/api/user/";

// Hàm đăng kí người dùng mới
export const signUp = async (user) => {
  console.log(user)
  try {
    await axios.post(baseURL + "register", {
      userId: user.userId,
      userName: user.userName,
      password: user.password,
      phone: user.phone,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
  }
};

// Hàm đăng nhập
export const logIn = async (userId, password) => {
  try {
    const res = await axios.post(baseURL + "login", {
      userId: userId,
      password: password,
    });
    localStorage.setItem("token", res.data);
  } catch (error) {
    console.log(error);
  }
};

// Hàm lấy thông tin người dùng hiện tại

export const getLoggedInUser = async (token) => {
  try {
    const res = await axios.get(baseURL + "me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.dir(res.data);
    localStorage.setItem("currentUser", JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    console.log(error);    
  }
}


