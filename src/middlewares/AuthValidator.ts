import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

const register = [
  check('name').isString().isLength({ max: 16 }),
  check('username').isString().isLength({ max: 16 }),
  check('password').isLength({ min: 4 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).send({
        errors: errors.array(),
      });
    }

    return next();
  },
];

const login = [
  check('username').isString(),
  check('password'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).send({
        errors: errors.array(),
      });
    }

    return next();
  },
];

const AuthValidate = {
  register,
  login,
};

export default AuthValidate;
