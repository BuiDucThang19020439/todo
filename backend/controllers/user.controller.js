const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const { registerValidator } = require('../validations/auth');
const { authenticateToken } = require('../middlewares/verifyToken');

// đăng ký token và gửi nó vào header
const generateToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 });
}

/**
 * Hàm login dùng cho việc đăng nhập
 * @param req gồm userId và password dc gửi từ client để check 
 * @param res thông điệp trả về
 * @returns thông điệp trả về xác nhận việc đăng nhập thành công hay thất bại
 */
const login = asyncHandler( async (req, res) => {
    try {
        // check userId
        const user = await User.findOne({userId: req.body.userId});
        if (!user) return res.status(422).send('Tên đăng nhập hoặc mật khẩu không đúng');

        // check password
        const checkPassword = await bcrypt.compare(req.body.password, user.password);
        if (!checkPassword) return res.status(422).send('Tên đăng nhập hoặc mật khẩu không đúng');

        // đăng ký token và gửi nó vào header
        const token = generateToken(user._id);
        res.header('auth-token', token).send(token);
        console.log(`Người dùng ${user.userName} đã đăng nhập`);
        return;
        // return res.send(`User ${user.userName} has logged in`);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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
const register = asyncHandler( async (req, res) => {
    const { error } = registerValidator(req.body);
    if (error) return res.status(422).send( error.details[0].message );

    //check email đã tồn tại hay chưa
    const checkUserExist = await User.findOne({ userId: req.body.userId });
    if (checkUserExist) return res.status(422).send('Id đăng nhập đã tồn tại');
    
    // mã hóa mật khẩu trước khi lưu vào db
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // object user mới gửi lên db
    const user = new User({
        userId: req.body.userId,
        userName: req.body.userName,
        password: hashedPassword,
        phone: req.body.phone,
        email: req.body.email
    });
    if (user) {
        const newUser = await user.save();
        await res.send(newUser);
    } else {
        res.status(400).send("Dữ liệu người dùng không hợp lệ");
    }
});

/**
 * Hàm getUserList lấy danh sách tất cả người dùng
 */
const getUserList = async (req, res) => {
    try {
        await User.find({}).then((err, user_list) => {
            res.status(200).json(user_list);
        }).catch ((error) =>{
            res.status(500).json({ message: error.message });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {login, logout, register, getUserList};