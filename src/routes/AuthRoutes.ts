import BaseRoutes from './BaseRoutes';
import AuthValidate from './../middlewares/AuthValidator';
import AuthMiddleware from './../middlewares/AuthMiddleware';

// Controllers
import AuthController from './../controllers/AuthController';

class AuthRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post(
      '/register',
      AuthValidate.register,
      AuthController.register
    );
    this.router.post('/login', AuthValidate.login, AuthController.login);
    this.router.get('/profile', AuthMiddleware.check, AuthController.profile);
  }
}

export default new AuthRoutes().router;
