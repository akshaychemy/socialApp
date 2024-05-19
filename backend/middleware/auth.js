import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if(!authHeader){
        return res.status(401).json({error: 'No token provided'});
    }

    const token = authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({error: 'No token provided'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();

    }catch(err){
        return res.status(401).json({error: 'Token is not valid'});
    }
}


export default authenticateToken;
