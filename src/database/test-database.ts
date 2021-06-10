import { connect, disconnect } from 'mongoose';

async function connectToDb() {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };
    return await connect(String(process.env.TESTS_DB), options);
  } catch (error) {
    return error;
  }
}
async function disconnectFromDB() {
  return disconnect();
}
export default { connectToDb, disconnectFromDB };
