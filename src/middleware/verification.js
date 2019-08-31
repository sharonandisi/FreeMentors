import jwt from 'jsonwebtoken';
import User from '../models/userModel';

class Verify {
    /**
     * class constructor
     * @param { object } data
     */

    verifyUser(req,res,next) {
         const user = User.findByEmail(req.body.email.trim());
         if (user) {
             return res.status(400).json({
                 status: 400,
                 error: 'This email is already in use'
             });
         }
         next();
    },
      
    verifyRegistereduser(req,res,next) {
        const user = User.findByEmail(req.body.email.trim());
        if (!user) {
            return res.status(400).json({
                status: 400,
                error: 'Please sign up to access this service'
            });
        }
        next();
    },

    verifyexistingUser(req,res) {
        const userid = req.decoded.payload;
        const user = User.findOne(userid);
        if(!user) {
            return res.status(404).json({
                status: 404,
                error: 'User does not exist',
            });
        }
        next();
    },

    verifyAdmin(req,res) {
        const id = req.decoded.payload;
        const user = User.findOne(id);

        if(!user || !user.is_Admin) {
            return res.status(403).json({
                status: 403,
                message: 'Access denied',
            });
        }
        next();
    },

    verifyauthenUser(req, res, next) {
        const token = req.header('bearer-token');

        if(!token) {
            return res.status(401).json({
                status: 401,
                error: 'Failed to fetch token.Please try again'
            });
        }

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (error) {
                return res.status(401).json({
                    status: 401,
                    error: 'Failed to fetch token.Please try again'
                });
            }
            req.decoded = decoded;
            next();
        });
    },

    checkmentorStatus (req,res,next) {
        const { mentorid } = req.body;
        const mentor = User.findOne(mentorid);
        if(!mentor || mentor.mentorstatus !== 'true') {
            return res.status(400).json({
                status: 400,
                error: 'Mentor status not activated'
            });
        }
        next();
    },

    verifymentor (req, req, next){
        const mentorid = req.decoded.payload;
        const mentor = User.findOne(mentorid);
        if (!mentor || mentorstatus !== 'true') {
            return res.status(403).json({
                status: 403,
                error: 'Access denied',
            });
        }
        next();
    }     
}

export default Verify;
