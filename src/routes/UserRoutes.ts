import BaseRoutes from './BaseRoutes';
import AuthMiddleware from '../middlewares/AuthMiddleware';

// Controllers
import UserController from './../controllers/UserController';

class RoomRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/:id', AuthMiddleware.check, UserController.show);
  }
}

export default new RoomRoutes().router;
