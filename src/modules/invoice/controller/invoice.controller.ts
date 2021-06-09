import { Request, Response } from 'express';
import ResponseHandler from '../../../utils/response-handlers/ResponseHandler';
import InvoiceService from '../service/invoice.service';
import * as statusCode from '../../../utils/status-codes/http-status-codes';

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
        return ResponseHandler.SuccessResponse(
          res,
          statusCode.HTTP_CREATED,
          true,
          'Created Client',
          { invoice },
        );
      }
      return ResponseHandler.ErrorResponse(
        res,
        statusCode.HTTP_BAD_REQUEST,
        false,
        'Unable to create client',
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
