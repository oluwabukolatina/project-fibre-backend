/* eslint-disable @typescript-eslint/no-unused-vars */
import Model from '../entity/invoice.model';
import { IInvoice } from '../interface/invoice.interface';

interface ICreateInvoice {
  name: IInvoice['name'];
  user: IInvoice['user'];
  client: IInvoice['client'];
  paid: IInvoice['paid'];
}
class InvoiceService {
  public static async createInvoice(data: ICreateInvoice) {
    try {
      return await Model.create(data);
    } catch (e) {
      return e;
    }
  }
}
export default InvoiceService;
