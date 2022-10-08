import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) { return res.status(401).json( "Please Login"); }
    const verify = jwt.verify(token , process.env.SECRET_KEY , (err,user) => {
        if(err){return res.json({
            msg :"Error : "+err.message
        })}
        // console.log(user.id); 
        req.userId = user.id;
        next();
    })
}