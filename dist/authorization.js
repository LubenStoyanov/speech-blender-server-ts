import jwt from "jsonwebtoken";
import { User } from "./models/user.js";
export default async (req, res, next) => {
    const token = req.cookies.token;
    // const { token } = req.body;
    // console.log(token);
    if (!token) {
        console.log("No token");
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        await User.findOne({ _id: data._id });
        return next();
    }
    catch (error) {
        console.error(error);
        return res.sendStatus(403);
    }
};
//# sourceMappingURL=authorization.js.map