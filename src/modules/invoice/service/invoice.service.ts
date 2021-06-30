import Model from '../entity/invoice.model';
import { IInvoice } from '../interface/invoice.interface';

interface ICreateInvoice {
  name: IInvoice['name'];
  user: IInvoice['user'];
  client: IInvoice['client'];
  paid: IInvoice['paid'];
  amount: IInvoice['amount'];
  description: IInvoice['description'];
}
class InvoiceService {
  public static async createInvoice(data: ICreateInvoice) {
    try {
      return await Model.create(data);
    } catch (e) {
      return e;
    }
  }

  public static async getInvoices(data: string) {
    try {
      return await Model.find({ client: data });
    } catch (e) {
      return e;
    }
  }

  public static async getInvoice(data: { _id: string }) {
    try {
      return await Model.find(data);
    } catch (e) {
      return e;
    }
  }

  public static async updateInvoice(
    query: { _id: string },
    data: { paid: IInvoice['paid'] },
  ) {
    try {
      return await Model.findByIdAndUpdate(query, data);
    } catch (e) {
      return e;
    }
  }
}
export default InvoiceService;
