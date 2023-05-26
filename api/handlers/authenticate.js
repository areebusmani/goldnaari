const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        // return res.sendStatus(401);
    }
    req.storeId = 1;
    next();
}

export default authenticate;