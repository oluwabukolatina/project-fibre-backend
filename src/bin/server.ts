import app from '../app';
import logger from '../config/logger';
import db from '../database/database';
/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
app.listen(PORT, () => {
  db.connectToDb()
    // eslint-disable-next-line no-console
    .then(() => {
      logger.info('connected');
      logger.info(`App is running at ${PORT}`);
    })
    // eslint-disable-next-line no-console
    .catch(() => console.log('something went wrong'));
});
