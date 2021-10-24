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
    this.app.use('/api/v1/room', RoomRoutes);
    this.app.use('/api/v1/chat', ChatRoutes);
  }
}

const app = new App().app;

mongoose
  .connect(`${process.env.DATABASE}`)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`running with server ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
