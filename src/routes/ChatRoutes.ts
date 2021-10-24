import BaseRoutes from './BaseRoutes';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import ChatValidate from '../middlewares/ChatValidator';

// Controllers
import ChatController from './../controllers/ChatController';

class ChatRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post(
      '/create',
      AuthMiddleware.check,
      ChatValidate.create,
      ChatController.create
    );
    this.router.get('/:room_id', AuthMiddleware.check, ChatController.show);
  }
}

export default new ChatRoutes().router;
