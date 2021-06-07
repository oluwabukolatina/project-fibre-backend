import { connect } from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
const DB = String(process.env.APP_DB);
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function connectToDb() {
  try {
    return await connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    return error;
  }
}
export default { connectToDb };
