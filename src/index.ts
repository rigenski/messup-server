import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { config as dotenv } from 'dotenv';
import mongoose from 'mongoose';

// Routers
import AuthRoutes from './routes/AuthRoutes';
import RoomRoutes from './routes/RoomRoutes';
import ChatRoutes from './routes/ChatRoutes';
import UserRoutes from './routes/UserRoutes';

// Models
const Chat = require('./models/ChatModel');
const Room = require('./models/RoomModel');

// UTILS
const { addUser, getUser, removeUser } = require('./utils/Socket');

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
    dotenv();
  }

  protected plugins(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
    this.app.use(cors());
  }

  protected routes(): void {
    this.app.route('/').get((req: Request, res: Response) => {
      res.send('build express with typescript');
    });

    this.app.use('/api/v1/auth', AuthRoutes);
    this.app.use('/api/v1/user', UserRoutes);
    this.app.use('/api/v1/room', RoomRoutes);
    this.app.use('/api/v1/chat', ChatRoutes);
  }
}

const app = new App().app;

const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: '*' } });

io.on('connection', (socket: any) => {
  socket.on('join', ({ user_id, room_id }: any) => {
    const { error } = addUser({
      socket_id: socket.id,
      user_id,
      room_id,
    });

    socket.join(room_id);

    if (error) {
      console.log('join socket failed');
    }
  });

  socket.on('disconnect', () => {
    removeUser(socket.id);
  });

  socket.on('get-rooms-history', () => {
    Room.find().then((result: any) => {
      socket.emit('get-rooms', result);
    });
  });

  socket.on('store-room', (name: any, user_id: any) => {
    const codeGenerator = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    const room = new Room({
      name: name,
      code: codeGenerator,
      user_id: user_id,
    });

    room
      .save()
      .then((result: any) => {
        io.emit('room', result);
      })
      .catch((err: any) => {
        console.log(err);
      });
  });

  socket.on('get-chats-history', (room_id: any) => {
    Chat.find({ room_id: room_id })
      .populate('user_id')
      .then((result: any) => {
        socket.emit('get-chats', result);
      })
      .catch((err: any) => {
        console.log(err);
      });
  });

  socket.on('store-chat', (text: any, room_id: any, callback: any) => {
    const user: any = getUser(socket.id);

    if (user) {
      const store = {
        user_id: user.user_id,
        room_id: room_id,
        text: text,
      };
      const chat = new Chat(store);
      chat
        .save()
        .then((result: any) => {
          Chat.findOne({ _id: result._id })
            .populate('user_id')
            .then((result: any) => {
              io.to(room_id).emit('chat', result);
              callback();
            })
            .catch((err: any) => {
              console.log(err);
            });
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  });
});

mongoose
  .connect(`${process.env.DATABASE}`)
  .then(() => {
    http.listen(process.env.PORT, () => {
      console.log(`running with server ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
