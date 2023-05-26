import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { User } from "../models/user.js";
import { generateToken } from "../utils/jwt.js";

const saltRounds = 10;

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const user = await User.exists({ email: email });

  if (user) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists." });
  } else {
    try {
      const hash = await bcrypt.hash(password, saltRounds);
      const newUser = await User.create({
        username: username,
        email: email,
        password: hash,
      });

      return res.status(201).json({ success: true, message: "User created." });
    } catch (error) {
      console.error(error);
      return res
        .status(201)
        .json({ success: false, message: "Something went wrong." });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) throw Error;

    const token = generateToken({
      userId: user._id,
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
      success: true,
      message: "Login successful.",
      token: token,
      username: user.username,
      userId: user._id,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: "Username or password wrong." });
  }
};

export const logout = async (_: any, res: Response) => {
  try {
    res.clearCookie("token", {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
    return res
      .status(200)
      .json({ success: true, message: "Logout successful." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong." });
  }
};

export const validateToken = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ success: true, message: "User validated." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error." });
  }
};
