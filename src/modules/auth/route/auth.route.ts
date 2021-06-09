import { Application } from 'express';
import URLS from '../../../utils/urls/urls';
import AuthController from '../controller/auth.controller';
import validation from '../middlewares/auth.middleware';

class AuthRoutes {
  public authController: AuthController = new AuthController();

  public routes = (app: Application): void => {
    app
      .route(`${URLS.AUTH_URL}/login`)
      .post(
        validation.validateLogin,
        validation.checkIfUserExists,
        this.authController.loginUser,
      );
    app
      .route(`${URLS.AUTH_URL}/register`)
      .post(
        validation.validateRegister,
        validation.checkIfARegisteredUser,
        this.authController.register,
      );
  };
}
export default AuthRoutes;
