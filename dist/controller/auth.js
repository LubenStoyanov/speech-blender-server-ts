import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { generateToken } from "../utils/jwt.js";
const saltRounds = 10;
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.exists({ email: email });
    if (user) {
        return res
            .status(400)
            .json({ status: 400, message: "User already exists." });
    }
    else {
        try {
            const hash = await bcrypt.hash(password, saltRounds);
            const newUser = await User.create({
                username: username,
                email: email,
                password: hash,
            });
            return res.status(201).json({ status: 200, message: "User created." });
        }
        catch (error) {
            console.error(error);
        }
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        const passwordCorrect = await bcrypt.compare(password, user.password);
        if (!passwordCorrect)
            throw Error;
        const token = generateToken({
            id: user._id,
            username: user.username,
            email: user.email,
        });
        res.cookie("token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            secure: true,
            httpOnly: true,
            sameSite: "none",
        });
        return res.status(200).json({
            status: 200,
            message: "Login successful.",
            token: token,
            username: user.username,
        });
    }
    catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ status: 400, message: "Username or password wrong." });
    }
};
export const logout = async (_, res) => {
    try {
        res.clearCookie("token", {
            sameSite: "none",
            secure: true,
            httpOnly: true,
        });
        return res.status(200).json({ status: 200, message: "Logout successful." });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ status: 500, message: "Something went wrong." });
    }
};
//# sourceMappingURL=auth.js.map