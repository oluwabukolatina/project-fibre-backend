import { Application } from 'express';
import URLS from '../../../utils/urls/urls';
import auth from '../../middlewares/auth';
import InvoiceController from '../controller/invoice.controller';
import invoiceMiddleware from '../middleware/invoice.middleware';
import invoiceUrl from '../url/invoiceUrl';

class InvoiceRoutes {
  public invoiceController: InvoiceController = new InvoiceController();

  public routes = (app: Application): void => {
    app
      .route(`${URLS.INVOICE_URL}`)
      .post(
        auth,
        invoiceMiddleware.validateCreateInvoice,
        this.invoiceController.createInvoice,
      );
    app
      .route(`${URLS.INVOICE_URL}/:invoiceId`)
      .get(auth, this.invoiceController.getOneInvoice);
    app
      .route(`${URLS.INVOICE_URL}/client/:clientId`)
      .get(auth, this.invoiceController.getClientInvoices);
    app
      .route(`${invoiceUrl.VERIFY_INVOICE_PAYMENT_URL}/:reference`)
      .get(this.invoiceController.verifyInvoicePayment);
  };
}
export default InvoiceRoutes;
