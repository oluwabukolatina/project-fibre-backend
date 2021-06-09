import { connect } from 'mongoose';
import * as dotenv from 'dotenv';
import { ENVIRONMENT, APP_DB } from '../config/secrets';

dotenv.config();
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function connectToDb() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };
  try {
    return await connect(
      ENVIRONMENT === 'development' ? String(process.env.LOCAL_DB) : APP_DB,
      options,
    );
  } catch (error) {
    return error;
  }
}
export default { connectToDb };
