import { ApplicationError } from '../lib/application-error.js';
import { User } from '../models/UserModel/UserModel.js';
import jwt from 'jsonwebtoken';


export const protectedRoute = async (req, res, next) => {
  try {
    let token;
    const JWT_SECRET = process.env.JWT_SECRET
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'failed', 
        error: "Not authorized to access this route"
      });
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findOne({ email: decoded.email});
      if (!user) {
        return res.status(401).json({
          status: 'failed', 
          error: "User Not authorized to access this route"
        });
      }
      req.user = user
      next();
    } catch (e) {
      req.error = 'Error With JWT'
      next ()
    }
  } catch (err) {
    next(new ApplicationError(err.message, 500))
  }
};

export const authorize = (permitedPermissions) => async (req, res, next) => {
  try {
    const { permissions } = req.user || {}
    let permitted = false
    if (req.user?.role === 'superAdmin') {
      return next();
    }
    
    if (permitedPermissions.length) {
      for (let perm of permissions) {
        if (permitedPermissions.includes(perm)) {
          permitted = true
        }
      }
      if (permitted === true) {
        next();
      } else {
        return res.status(401).json({
            status: 'failed', 
            error: "No permissons to access this route"
        });
      }
    } else {
      return res.status(401).json({
        status: 'failed', 
        error: "No permissons to access this route"
      });
    }
  } catch (error) {
    console.log('Error ', error)
  }
  
};
