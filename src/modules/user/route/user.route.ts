import { Application } from 'express';
import URLS from '../../../utils/urls/urls';
import auth from '../../middlewares/auth';
import UserController from '../controller/user.controller';

class UserRoutes {
  public userController: UserController = new UserController();

  public routes = (app: Application): void => {
    app
      .route(`${URLS.USER_URL}/clients`)
      .get(auth, this.userController.getUserClients);
  };
}
export default UserRoutes;
