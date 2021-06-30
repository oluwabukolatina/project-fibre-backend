/* eslint-disable camelcase */
import superagent from 'superagent';
import { PAYSTACK_TEST_SECRET_KEY } from '../../../config/secrets';
import PAYSTACK_URL from '../url/paystackUrl';

interface IIntializeTransaction {
  email: string;
  callback_url: string;
  amount: number;
  currency: string;
  reference: string;
  metadata: {
    custom_fields: [
      {
        email: string;
        invoiceId: string;
        clientName: string;
        invoiceName: string;
      },
    ];
  };
}
const Paystack = {
  async initiateTransaction(data: IIntializeTransaction) {
    try {
      return await superagent
        .post(`${PAYSTACK_URL.INITIALIZE_TRANSACTION_URL}`)
        .send(data)
        .set('Authorization', `Bearer ${PAYSTACK_TEST_SECRET_KEY}`);
    } catch (e) {
      return e;
    }
  },
  async verifyTransaction(reference: string) {
    try {
      return await superagent
        .get(`${PAYSTACK_URL.VERIFY_TRANSACTION_URL}/${reference}`)
        .set('Authorization', `Bearer ${PAYSTACK_TEST_SECRET_KEY}`);
    } catch (e) {
      return e;
    }
  },
};
export default Paystack;
