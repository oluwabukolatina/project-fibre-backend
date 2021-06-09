/* eslint-disable @typescript-eslint/no-unused-vars */
import Model from '../entity/client.model';
import { IClient } from '../interface/client.interface';

interface ICreateClient {
  name: IClient['name'];
  email: IClient['email'];
}
class ClientService {
  public static async createClient(data: ICreateClient) {
    try {
      return await Model.create(data);
    } catch (e) {
      return e;
    }
  }
}
export default ClientService;
