import bcrypt from 'bcryptjs';
import { UserModel } from '../models/UserModel.js';
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    console.log(req.body)
    if (!req.body.email || !req.body.password || !req.body.name) { return res.status(202).json({ msg: "All Fields are mandatory" }); }
    try {
        const exists = await UserModel.findOne({ email: req.body.email });
        if (exists) { return res.status(202).json({ msg: "User Already Exists" }); }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        const user = new UserModel({ ...req.body, password: hash });
        const createdUser = await user.save();
        const { password, ...others } = createdUser._doc;

        if (createdUser) {
            const token = jwt.sign({ id: others._id }, process.env.SECRET_KEY);
            return res.status(200).json({
                msg: "Logged in Succesfully",
                user: others,
                token
            })
        } else { return res.status(500).json({ msg: "Internal Server Error" }); }
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

export const login = async (req, res, next) => {
    if (!req.body.email || !req.body.password) { return res.status(401).json({ msg: "Empty Field Recieved" }) }
    try {
        const exists = await UserModel.findOne({ email: req.body.email });
        if (!exists) { return res.status(401).json({ msg: "Invalid Credentials" }) }

        const verified = await bcrypt.compare(req.body.password, exists.password);
        if (!verified) { return res.status(401).json({ msg: "Invalid Credentials" }) }

        const { password, ...others } = exists._doc;
        const token = jwt.sign({ id: others._id }, process.env.SECRET_KEY);
        return res.status(200).json({
            msg: "Logged in Succesfully",
            user: others,
            token
        })
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

export const isLoggedIn = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) { return res.status(401).json({ msg: "User Not Found" }) }

        const { password, ...others } = user._doc;
        return res.status(200).json({
            user: others
        })
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}