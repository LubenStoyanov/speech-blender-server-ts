import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
const prisma = new PrismaClient();
const saltRounds = 10;
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { email: email },
        select: { name: true },
    });
    if (user) {
        return res
            .status(400)
            .json({ success: false, message: "User already exists." });
    }
    else {
        try {
            const hash = await bcrypt.hash(password, saltRounds);
            const newUser = await prisma.user.create({
                data: {
                    name: username,
                    email: email,
                    password: hash,
                },
            });
            return res.status(201).json({ success: true, message: "User created." });
        }
        catch (error) {
            console.error(error);
            return res
                .status(201)
                .json({ success: false, message: "Something went wrong." });
        }
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email: email } });
        const passwordCorrect = await bcrypt.compare(password, user.password);
        if (!passwordCorrect)
            throw Error;
        const token = generateToken({
            userId: user.id,
            username: user.name,
            email: user.email,
        });
        const oneDay = 1000 * 60 * 60 * 24;
        res.cookie("token", token, {
            maxAge: oneDay,
            secure: true,
            httpOnly: true,
            sameSite: "none",
        });
        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token: token,
            username: user.name,
            userId: user.id,
        });
    }
    catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ success: false, message: "Username or password wrong." });
    }
};
export const logout = async (_, res) => {
    try {
        res.clearCookie("token", {
            sameSite: "none",
            secure: true,
            httpOnly: true,
        });
        return res
            .status(200)
            .json({ success: true, message: "Logout successful." });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Something went wrong." });
    }
};
export const validateToken = async (req, res) => {
    try {
        return res.status(200).json({ success: true, message: "User validated." });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error." });
    }
};
//# sourceMappingURL=auth.js.map