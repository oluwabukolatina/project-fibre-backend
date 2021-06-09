import express from 'express';
import swaggerUi from 'swagger-ui-express';

import morgan from 'morgan';
/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import ClientRoutes from './lib/modules/client/route/client.route';
import swaggerDocument from '../swagger.json';
import AuthRoutes from './lib/modules/auth/route/auth.route';

/**
 * routes
 */
dotenv.config();

class App {
  public app: express.Application;

  public clientRoutes: ClientRoutes = new ClientRoutes();

  public authRoutes: AuthRoutes = new AuthRoutes();

  constructor() {
    this.app = express();
    this.config();
    this.clientRoutes.routes(this.app);
    this.authRoutes.routes(this.app);
    this.app.disable('x-powered-by');
    this.app.get('/', (req, res) => res.send('Project Fibre'));
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument),
    );
  }

  private config = (): void => {
    // this.app.use(helmet());
    // this.app.use(mongoSanitize());
    // this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan('dev'));
  };
}

export default new App().app;
