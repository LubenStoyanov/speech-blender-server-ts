export const loggerMiddleware = (req, _res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
};
//# sourceMappingURL=logger.js.map