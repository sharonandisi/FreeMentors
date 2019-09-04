/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel';

class Verify {
  /**
     * class constructor
     * @param { object } data
     */

  verifyUser(req, res, next) {
    const user = userModel.findByEmail(req.body.email.trim());
    if (user) {
      return res.status(400).json({
        status: 400,
        error: 'This email is already in use',
      });
    }
    return next();
  }

  verifyRegistereduser(req, res, next) {
    const user = userModel.findByEmail(req.body.email.trim());
    if (!user) {
      return res.status(400).json({
        status: 400,
        error: 'Please sign up to access this service',
      });
    }
    return next();
  }

  verifyexistingUser(req, res, next) {
    const userid = req.decoded.payload;
    const user = userModel.findOne(userid);
    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'User does not exist',
      });
    }
    return next();
  }


  verifyauthenUser(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
      return res.status(401).json({
        status: 401,
        error: 'Failed to fetch token.Please try again',
      });
    }

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          status: 401,
          error: 'Failed to fetch token.Please try again',
        });
      }
      req.decoded = decoded;
    });
    return next();
  }

  verifyAdmin(req, res, next) {
    const id = req.decoded.payload;
    const user = userModel.findAdmin();

    if (!user) {
      return res.status(403).json({
        status: 403,
        error: 'Access denied',
      });
    }
    return next();
  }

  checkmentorStatus(req, res, next) {
    const { mentorid } = req.body;
    const mentor = User.findOne(mentorid);
    if (!mentor || mentor.mentorstatus !== 'true') {
      return res.status(400).json({
        status: 400,
        error: 'Mentor status not activated',
      });
    }
    return next();
  }

  verifymentor(req, res, next) {
    const mentorid = req.decoded.payload;
    const mentor = User.findOne(mentorid);
    if (!mentor || User.mentorstatus !== 'true') {
      return res.status(403).json({
        status: 403,
        error: 'Access denied',
      });
    }
    return next();
  }

  verifysession(req, res, next) {
    const result = Session.findOne(req.params.sessionid);
    if (!result) {
      return res.status(404).json({
        status: 404,
        error: 'This session does not exist',
      });
    }
    next();
  };
}

export default new Verify();
