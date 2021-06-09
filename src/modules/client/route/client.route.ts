import { Application } from 'express';
import URLS from '../../../utils/urls/urls';
import auth from '../../middlewares/auth';
import ClientController from '../controller/client.controller';
import clientMiddleware from '../middleware/client.midlleware';

class ClientRoutes {
  public clientController: ClientController = new ClientController();

  public routes = (app: Application): void => {
    app
      .route(`${URLS.CLIENT_URL}`)
      .post(
        auth,
        clientMiddleware.validateCreateClient,
        this.clientController.createClient,
      );
  };
}
export default ClientRoutes;
