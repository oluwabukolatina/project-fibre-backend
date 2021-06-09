/* eslint-disable @typescript-eslint/no-unused-vars */
import Model from '../entity/client.model';
import { IClient } from '../interface/client.interface';

interface ICreateClient {
  name: IClient['name'];
  email: IClient['email'];
  owner: IClient['owner'];
}
class ClientService {
  public static async createClient(data: ICreateClient) {
    try {
      return await Model.create(data);
    } catch (e) {
      return e;
    }
  }

  public static async getUserClients(user: string) {
    try {
      return Model.find({ owner: user }).populate('owner', ['name', 'email']);
    } catch (error) {
      return error;
    }
  }
}
export default ClientService;
