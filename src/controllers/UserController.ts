import { Request, Response } from 'express';
const User = require('./../models/UserModel');

class UserController {
  show = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findOne({ _id: id });

    if (user) {
      return res.status(200).json({
        status: 'success',
        message: 'user has been successfully showed',
        result: user,
      });
    } else {
      return res.status(404).json({
        status: 'failed',
        message: 'user has been not found',
      });
    }
  };
}

export default new UserController();
