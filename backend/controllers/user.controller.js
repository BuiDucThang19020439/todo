const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const { registerValidator } = require('../validations/auth');

/**
 * Hàm login dùng cho việc đăng nhập
 * @param req gồm userId và password dc gửi từ client để check 
 * @param res thông điệp trả về
 * @returns thông điệp trả về xác nhận việc đăng nhập thành công hay thất bại
 */
const login = async (req, res) => {
    try {
        const user = await User.findOne({userId: req.body.userId});
        if (!user) return res.status(422).send('Tên đăng nhập hoặc mật khẩu không đúng');
        const checkPassword = await bcrypt.compare(req.body.password, user.password);
        if (!checkPassword) return res.status(422).send('Tên đăng nhập hoặc mật khẩu không đúng');
        return res.send(`User ${user.userName} has logged in`);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Hàm logout dùng cho việc đăng xuất
 * @param req gồm userId dc gửi từ client để check 
 * @param res thông điệp trả về
 */
const logout = async (req, res) => {
    try {
        const user = await User.findOne({userId: req.body.userId});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Hàm register dùng cho việc đăng ký người dùng mới
 * @param req là một obj gồm các trường userId, userName, password, phone, email dc gửi từ client 
 * @param res trả về client thông điệp đăng ký thành công hoặc thất bại
 * @returns gửi obj hợp lệ lên server hoặc báo lỗi nếu obj không hợp lệ
 */
const register = async (req, res) => {
    const { error } = registerValidator(req.body);
    if (error) return res.status(422).send( error.details[0].message );
    const checkEmailExist = await User.findOne({ email: req.body.email });
    if (checkEmailExist) return res.status(422).send('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        userId: req.body.userId,
        userName: req.body.userName,
        password: hashedPassword,
        phone: req.body.phone,
        email: req.body.email
    });
    try {
        const newUser = await user.save();
        await res.send(newUser);
    } catch (err) {
        res.status(400).send(err);
    }
}

/**
 * Hàm getUserList lấy danh sách tất cả người dùng
 */
const getUserList = async (req, res) => {
    try {
        const userList = await User.find({});
        res.status(200).json(userList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {login, logout, register, getUserList};