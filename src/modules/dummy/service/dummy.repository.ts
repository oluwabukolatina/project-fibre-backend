/* eslint-disable @typescript-eslint/no-unused-vars */
import Model from '../entity/dummy.model';

class DummyRepository {
  public static async create(data: any) {
    try {
      return await Model.create(data);
    } catch (e) {
      return e;
    }
  }
}
export default DummyRepository;
