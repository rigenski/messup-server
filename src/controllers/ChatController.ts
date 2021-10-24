import { Request, Response } from 'express';
const Chat = require('./../models/ChatModel');

class ChatController {
  create = async (req: Request, res: Response): Promise<Response> => {
    const { text, room_id } = req.body;
    const credential = req.app.locals.credential;

    const saveChat = new Chat({
      text: text,
      user_id: credential.id,
      room_id: room_id,
    });

    await saveChat.save();

    return res.status(200).json({
      status: 'success',
      message: 'chat has been successfully created',
    });
  };

  show = async (req: Request, res: Response) => {
    try {
      const { room_id } = req.params;

      const chats = await Chat.find({ room_id: room_id });

      return res.status(200).json({
        status: 'success',
        message: 'chats has been successfully showed',
        result: chats,
      });
    } catch (e) {
      return res.status(404).json({
        status: 'failed',
        message: 'chats has been not found',
      });
    }
  };
}

export default new ChatController();
