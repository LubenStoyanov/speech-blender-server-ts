"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const setCookie = async (req, res, next) => {
    const token = req.cookies.token;
    const userId = req.userId;
    if (token === undefined) {
        const token = jsonwebtoken_1.default.sign({ _id: userId }, process.env.JWT_SECRET);
        console.log("Setting cookie");
        return res
            .cookie("token", token, {
            httpOnly: true,
            secure: false,
        })
            .status(200)
            .json({ message: "Logged in" });
    }
    return res.sendStatus(403);
};
exports.setCookie = setCookie;
//# sourceMappingURL=cookie.js.map