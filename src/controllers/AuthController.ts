import { Request, Response } from 'express';
import Authentication from '../utils/Authentication';
const User = require('./../models/UserModel');

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    const { name, username, password } = req.body;
    const passwordHashed: string = await Authentication.passwordHash(password);

    const user = await User.findOne({ username: username });

    if (!user) {
      const saveUser = new User({
        name: name,
        username: username,
        password: passwordHashed,
      });

      await saveUser.save();

      return res.status(201).json({
        status: 'success',
        message: 'user has been successfully registered',
      });
    } else {
      return res.status(400).json({
        status: 'failed',
        message: 'user already exists',
      });
    }
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (user) {
      const compare = await Authentication.passwordCompare(
        password,
        user.password
      );

      if (compare) {
        const token = Authentication.generateToken(user.id);

        return res.status(200).json({
          status: 'success',
          message: 'user has been successfully login',
          token: token,
        });
      } else {
        return res.status(400).json({
          status: 'failed',
          message: 'username or password incorrect',
        });
      }
    } else {
      return res.status(400).json({
        status: 'failed',
        message: 'user not found',
      });
    }
  };

  profile = async (req: Request, res: Response): Promise<Response> => {
    const credential = req.app.locals.credential;

    const user = await User.findById(credential.id);

    return res.status(200).json({
      status: 'success',
      message: 'profile successfully show',
      result: user,
    });
  };
}

export default new AuthController();
