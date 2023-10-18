const CryptoJS = require('crypto-js');
// const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const User = require("../models/User");

const SECRET_KEY = process.env.ADD_USER_SECRET || "VizFaculty is Calculating";

const register = async (req, res, next) => {
    try {
        const userAlive = await User.findOne({ email: req.body.email });
        if (userAlive) {
            return res.send({ success: false, message: "User Already Exists..!" });
        }
        const hashedPass = CryptoJS.AES.encrypt(req.body.password, SECRET_KEY).toString();
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
            role: req.body.role || "normal"
        });
        user.save().then(async (result) => {
            console.log(result);
            // const token = jwt.sign({ email: userData.email },
            //     SECRET_KEY,
            //     {
            //         expiresIn: "3h",
            //     }
            // );
            // const hashedToken = CryptoJS.AES.encrypt(token, process.env.RESETPASS_SECRET_KEY || "VizFaculty is calculating").toString();
            // // console.log("http://localhost:4000/reset-password/",atob(token));
            // const mailStatus = await sendMail({ name: result.name, token: btoa(token), email: result.email, type: "verify" });
            //     if (mailStatus.accepted.includes(userData.email))
            //     res.send({ success: true, message: `Password reset email sent to ${userData.email}`, email: userData.email });
            // else if (mailStatus.rejected.includes(userData.email))
            //     res.send({ success: false, message: "Unable to send password reset email..!" })

            res.status(201).send({ success: true, message: `Registered successfully..!`, user: { name: result.name, email: result.email } });
        }).catch((err) => {
            next({ statusCode: 500, message: "Internal Server Error" });
        });
        // console.log(hashedPass);
    } catch (error) {
        console.log(error);
        error.statusCode = 400;
        next(error);
    }
    // res.send({message : req.body.name+" zala satyanash"});
};

const getUser = async (req, res, next) => {
    try {
        const { userId } = req.user;
        if (!mongoose.isValidObjectId(userId))
            return next({ message: "invalid refrence for request", statusCode: 400 });
        const user = await User.findOne({_id:userId});
        if(!user)
            return next({statusCode:404, message:"user not found / maybe user deleted"});
        const {name, email, role, roleId } = user; 
        res.send({success:true, user:{name, email, role, roleId}});
    } catch (error) {
        error.statusCode = 500;
        next(error)
    }
};
const login = async (req, res, next) => {
    try {
        // const  = req.body;
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            next({ statusCode: 404, message: "Mismatched email or password..!" });
        const bytes = CryptoJS.AES.decrypt(
            user.password,
            SECRET_KEY
        );
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password) {
            return res.status(401).send({ success: false, message: "Mismatched email or password..!" });
        }
        const accessToken = jwt.sign(
            { userId: user._id, role:user.role, email: user.email },
            SECRET_KEY,
            {
                expiresIn: "7d",
            }
        );
        const { password, _id, ...info } = user._doc;
        res.status(200).send({ user: { ...info }, success: true, message: "Logged in successfully..!", token: accessToken });

    } catch (error) {
        next({ statusCode: 500, message: error.message });
    }
};
module.exports = { register, login, getUser };