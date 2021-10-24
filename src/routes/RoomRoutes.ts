import BaseRoutes from './BaseRoutes';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import RoomValidate from '../middlewares/RoomValidator';

// Controllers
import RoomController from './../controllers/RoomController';

class RoomRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/', AuthMiddleware.check, RoomController.index);
    this.router.post(
      '/create',
      AuthMiddleware.check,
      RoomValidate.create,
      RoomController.create
    );
    this.router.get('/:code', AuthMiddleware.check, RoomController.show);
  }
}

export default new RoomRoutes().router;
