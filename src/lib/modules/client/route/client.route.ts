import { Application } from 'express';
import ClientController from '../controller/client.controller';
import URLS from '../../../urls/urls';
import clientMiddleware from '../middleware/client.midlleware';

class ClientRoutes {
  public clientController: ClientController = new ClientController();

  public routes = (app: Application): void => {
    app
      .route(`${URLS.CLIENT_URL}`)
      .post(
        clientMiddleware.validateCreateClient,
        this.clientController.createClient,
      );
  };
}
export default ClientRoutes;
