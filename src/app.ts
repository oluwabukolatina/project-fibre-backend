import express from 'express';

import morgan from 'morgan';
/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import ClientRoutes from './modules/client/route/client.route';
import AuthRoutes from './modules/auth/route/auth.route';
import UserRoutes from './modules/user/route/user.route';
import InvoiceRoutes from './modules/invoice/route/invoice.route';

/**
 * routes
 */
dotenv.config();

class App {
  public app: express.Application;

  public clientRoutes: ClientRoutes = new ClientRoutes();

  public authRoutes: AuthRoutes = new AuthRoutes();

  public userRoutes: UserRoutes = new UserRoutes();

  public invoiceRoutes: InvoiceRoutes = new InvoiceRoutes();

  constructor() {
    this.app = express();
    this.config();
    this.clientRoutes.routes(this.app);
    this.authRoutes.routes(this.app);
    this.userRoutes.routes(this.app);
    this.invoiceRoutes.routes(this.app);
    this.app.disable('x-powered-by');
    this.app.get('/', (req, res) => res.send('Project Fibre'));
  }

  private config = (): void => {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
  };
}

export default new App().app;
