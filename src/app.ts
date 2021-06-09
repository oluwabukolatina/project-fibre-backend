import morgan from 'morgan';
import * as dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import swaggerDocument from '../swagger.json';
import ClientRoutes from './lib/modules/client/route/client.route';

/**
 * routes
 */
dotenv.config();

class App {
  public app: express.Application;

  public clientRoutes: ClientRoutes = new ClientRoutes();

  constructor() {
    this.app = express();
    this.config();
    this.clientRoutes.routes(this.app);
    this.app.get('/', (req, res) => res.send('Project Fiber!'));
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument),
    );
  }

  private config = (): void => {
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(
      expressWinston.errorLogger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json(),
        ),
      }),
    );
  };
}

export default new App().app;
