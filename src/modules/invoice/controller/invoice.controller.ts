import { Request, Response } from 'express';
import ResponseHandler from '../../../utils/response-handlers/ResponseHandler';
import InvoiceService from '../service/invoice.service';
import * as statusCode from '../../../utils/status-codes/http-status-codes';
import ClientService from '../../client/service/client.service';
import Email from '../../../utils/email/email';
import MailHelpers from '../../../utils/email/helper';

class InvoiceController {
  public createInvoice = async ({ body, user }: Request, res: Response) => {
    try {
      const invoice = await InvoiceService.createInvoice({
        name: body.name,
        client: body.client,
        user: user.id,
        paid: false,
        amount: body.amount,
        description: body.description,
      });
      if (invoice._id) {
        // send email to the client after generating the invoice
        /**
         * email may be found in spam too, will be best to check ther just in case
         */
        const client = await ClientService.getClient({ _id: body.client });
        await Email.sendWithNodemailer(
          MailHelpers.createInvoiceEmail(
            invoice._id,
            invoice.createdAt,
            client.name,
            client.email,
            invoice.name,
            invoice.description,
            invoice.amount,
            (20 / 100) * invoice.amount,
            20 / 100 + invoice.amount + (20 / 100) * invoice.amount,
          ),
        );
        return ResponseHandler.SuccessResponse(
          res,
          statusCode.HTTP_CREATED,
          true,
          'Created Invoice',
          {
            paymentStatus: invoice.paid,
            id: invoice._id,
            name: invoice.name,
            amount: invoice.amount,
            description: invoice.description,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
          },
        );
      }
      return ResponseHandler.ErrorResponse(
        res,
        statusCode.HTTP_BAD_REQUEST,
        false,
        'Unable to create invoice',
      );
    } catch (e) {
      return ResponseHandler.ServerErrorResponse(res);
    }
  };

  public getClientInvoices = async (request: Request, response: Response) => {
    try {
      const invoices = await InvoiceService.getInvoices(
        request.params.clientId,
      );
      if (invoices) {
        return ResponseHandler.SuccessResponse(
          response,
          statusCode.HTTP_OK,
          true,
          'Fetched the clients invoices',
          { invoices },
        );
      }
      return ResponseHandler.ErrorResponse(
        response,
        statusCode.HTTP_BAD_REQUEST,
        false,
        'Unable to fetch the clients invoices',
      );
    } catch (e) {
      return ResponseHandler.ServerErrorResponse(response);
    }
  };

  public getOneInvoice = async (request: Request, response: Response) => {
    try {
      const invoice = await InvoiceService.getInvoice({
        _id: request.params.invoiceId,
      });
      if (invoice) {
        return ResponseHandler.SuccessResponse(
          response,
          statusCode.HTTP_OK,
          true,
          'Fetched one invoice',
          { invoice },
        );
      }
      return ResponseHandler.ErrorResponse(
        response,
        statusCode.HTTP_BAD_REQUEST,
        false,
        'Unable to fetch the invoice',
      );
    } catch (e) {
      return ResponseHandler.ServerErrorResponse(response);
    }
  };
}
export default InvoiceController;
