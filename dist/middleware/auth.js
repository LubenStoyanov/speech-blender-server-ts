import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
    console.log("here", req.cookies);
    // const authHeader = req.headers.authorization;
    const token = req.cookies.token;
    console.log(token);
    if (token) {
        // const token = authHeader.split(" ")[1];
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            if (!decodedToken) {
                return res.status(403).json({ error: "Missing required claim" });
            }
            req.user = decodedToken;
            next();
        }
        catch (err) {
            return res.status(401).json({ error: "Invalid token" });
        }
    }
    else {
        return res.status(401).json({ error: "No token provided" });
    }
};
//# sourceMappingURL=auth.js.map