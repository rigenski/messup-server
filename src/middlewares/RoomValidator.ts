import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

const create = [
  check('name').isString().isLength({ max: 24 }),
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

const RoomValidate = {
  create,
};

export default RoomValidate;
