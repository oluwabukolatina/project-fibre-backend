import app from '../app';
import db from '../lib/v1/config/database/database';
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
    .then(() => console.log('connected to db'))
    // eslint-disable-next-line no-console
    .catch(() => console.log('something went wrong'));
});
