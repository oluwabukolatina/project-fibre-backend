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
}
export default InvoiceController;
