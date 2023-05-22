"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDuplicateUser = void 0;
const user_js_1 = require("../models/user.js");
const checkDuplicateUser = async (req, res, next) => {
    const { username, email } = req.body;
    const emailExists = await user_js_1.User.findOne({ email: email });
    if (emailExists)
        return res.status(409).json({
            error: "email",
        });
    const usernameExists = await user_js_1.User.findOne({ username: username });
    if (usernameExists)
        return res.status(409).json({
            error: "username",
        });
    next();
};
exports.checkDuplicateUser = checkDuplicateUser;
//# sourceMappingURL=error.js.map