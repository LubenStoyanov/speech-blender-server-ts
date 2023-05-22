import jwt from "jsonwebtoken";
export const setCookie = async (req, res, next) => {
    const token = req.cookies.token;
    const userId = req.userId;
    if (token === undefined) {
        const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET);
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
//# sourceMappingURL=cookie.js.map