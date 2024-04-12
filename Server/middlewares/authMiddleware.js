// import jwt from 'jsonwebtoken';
// import User from '../Models/user.js'
// const protectRoute =async (req,res,next)=>{
//     try {
//         let token = res.cookie.token;

//         if(token){
//             const decodedToken=jwt.verify(token,process.env.JWT_SECRET)

//             const resp = await User.findById(decodedToken.userId).select(
//                 "isAdmin email"
//             );

//             req.user ={
//                 email:resp.email,
//                 isAdmin:resp.isAdmin,
//                 usereId:decodedToken.userId,
//             };
//             next();
//         }

//     } catch (error) {
//         console.log(error);
//         return res.status(401).json({
//             status:false,message:"Not authorised.Try login again"
//         })
        
//     }
// }

// const isAdminRoute = (req, res, next) => {
//     if (req.user && req.user.isAdmin) {
//         next();
//     } else {
//         return res.status(401).json({
//             status: false,
//             message: "Not authorized as admin. Try login as admin.",
//         });
//     }
// };

// export {isAdminRoute,protectRoute}; 

import jwt from 'jsonwebtoken';
import User from '../Models/user.js';

const protectRoute = async (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const token = req.cookies?.token;

        if (token) {
            // Verify the token
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user by userId in the token
            const resp = await User.findById(decodedToken.userId).select(
                "isAdmin email"
            );

            // Attach user information to the request object
            req.user = {
                email: resp.email,
                isAdmin: resp.isAdmin,
                userId: decodedToken.userId, // Fixed typo here
            };

            // Proceed to the next middleware
            next();
        } else {
            // If token is not provided, return unauthorized status
            return res.status(401).json({
                status: false,
                message: "Token not provided. Please provide a valid token.",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            status: false,
            message: "Not authorized. Please login again.",
        });
    }
};

const isAdminRoute = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(401).json({
            status: false,
            message: "Not authorized as admin. Please login as admin.",
        });
    }
};

export { isAdminRoute, protectRoute };
