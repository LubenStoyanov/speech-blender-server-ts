"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_js_1 = require("../models/user.js");
exports.default = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        console.log("No token");
        return res.sendStatus(403);
    }
    try {
        const data = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        await user_js_1.User.findOne({ _id: data.id });
        return next();
    }
    catch (error) {
        console.error(error);
        return res.sendStatus(403);
    }
};
//# sourceMappingURL=authorization.js.map