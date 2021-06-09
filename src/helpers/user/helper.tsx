import UserServices from '../../user/services/UserServices';

const Helpers = {
  /** accepts email or id, rest password token and expiry   */
  async findUser(data: { email?: string; _id?: string }) {
    try {
      return await UserServices.findUser(data);
    } catch (e) {
      return e;
    }
  },
};
export default Helpers;
