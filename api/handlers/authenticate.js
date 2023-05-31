import jwt from 'jsonwebtoken';

const authenticate = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    if (!token) {
        response.sendStatus(401);
        return;
    }
    try {
        const {storeId} = jwt.verify(token, process.env.JWT_SECRET_KEY);
        request.storeId = storeId;
        next();
    } catch (error) {
        console.error(error);
        response.sendStatus(401);
    }
    
}

export default authenticate;
