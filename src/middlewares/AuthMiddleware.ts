import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const check = (req: Request, res: Response, next: NextFunction): any => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      status: 'failed',
      message: 'not authenticated',
    });
  }

  const secretKey: string = process.env.JWT_SECRET_KEY || 'secret';
  const token: string = req.headers.authorization.split(' ')[1];

  try {
    const credential: string | object = jwt.verify(token, secretKey);

    if (credential) {
      req.app.locals.credential = credential;

      return next();
    }

    return res.status(401).json({
      status: 'failed',
      message: 'token invalid',
    });
  } catch (err) {
    return res.status(401).json({
      status: 'failed',
      message: 'token error',
    });
  }
};

const AuthMiddleware = {
  check,
};

export default AuthMiddleware;
