import { Request, Response } from 'express';
const Room = require('./../models/RoomModel');

class RoomController {
  index = async (req: Request, res: Response) => {
    const rooms = await Room.find();

    return res.status(200).json({
      status: 'success',
      message: 'rooms has been successfully showed',
      result: rooms,
    });
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { name } = req.body;
    const credential = req.app.locals.credential;

    const codeGenerator = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    const room = await Room.findOne({ code: codeGenerator });

    if (!room) {
      const saveRoom = new Room({
        name: name,
        code: codeGenerator,
        user_id: credential.id,
      });

      await saveRoom.save();

      return res.status(201).json({
        status: 'success',
        message: 'room has been successfully created',
      });
    } else {
      return res.status(400).json({
        status: 'failed',
        message: 'room already exists',
      });
    }
  };

  show = async (req: Request, res: Response) => {
    const { code } = req.params;

    const room = await Room.findOne({ code: code });

    if (room) {
      return res.status(200).json({
        status: 'success',
        message: 'room details has been successfully showed',
        result: room,
      });
    } else {
      return res.status(404).json({
        status: 'failed',
        message: 'room details has been not found',
      });
    }
  };
}

export default new RoomController();
