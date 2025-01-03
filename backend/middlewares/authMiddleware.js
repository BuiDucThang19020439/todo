const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log("request header: ");
  console.log(req.headers);

  if (req.headers.authorization) {
    try {
      // lấy token từ header
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decode = jwt.verify(token, process.env.TOKEN_SECRET);

      // lấy thông tin user từ token
      req.user = await User.findById(decode.id).select("-password");
      console.log(decode);
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Không xác thực được");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Không xác thực được, không có token");
  }
});

module.exports = { protect };
