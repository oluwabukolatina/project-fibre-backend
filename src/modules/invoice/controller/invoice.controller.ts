import { Request, Response } from 'express';
import crypto from 'crypto';
import ResponseHandler from '../../../utils/response-handlers/ResponseHandler';
import InvoiceService from '../service/invoice.service';
import * as statusCode from '../../../utils/status-codes/http-status-codes';
import ClientService from '../../client/service/client.service';
import Email from '../../../utils/email/email';
import MailHelpers from '../../../utils/email/helper';
import Paystack from '../utils/paystack';
import INVOICE_URL from '../url/invoiceUrl';
import { ENVIRONMENT } from '../../../config/secrets';

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
        const reference = `ProjectFiber${crypto
          .randomBytes(5)
          .toString('hex')}`;
        const link = await Paystack.initiateTransaction({
          email: client.email,
          callback_url: `https://project-fibre.herokuapp.com${INVOICE_URL.VERIFY_INVOICE_PAYMENT_URL}/${reference}`,
          amount:
            (20 / 100 + invoice.amount + (20 / 100) * invoice.amount) * 100,
          currency: 'NGN',
          reference,
          metadata: {
            custom_fields: [
              {
                email: client.email,
                invoiceId: invoice._id,
                clientName: client.name,
                invoiceName: invoice.name,
              },
            ],
          },
        });
        if (link.body.status) {
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
              link.body.data.authorization_url,
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
          'Unable to generate the user payment link',
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

  public verifyInvoicePayment = async (
    request: Request,
    response: Response,
  ) => {
    try {
      const verify = await Paystack.verifyTransaction(request.params.reference);
      if (verify.body.status && verify.body.data.status === 'success') {
        await InvoiceService.updateInvoice(
          { _id: verify.body.data.metadata.custom_fields[0].invoiceId },
          { paid: true },
        );
        await Email.sendWithNodemailer(
          MailHelpers.successfulInvoicePaymentEmail(
            verify.body.data.metadata.custom_fields[0].clientName,
            verify.body.data.metadata.custom_fields[0].invoiceName,
            verify.body.data.metadata.custom_fields[0].email,
            verify.body.data.amount / 100,
          ),
        );
        return ResponseHandler.SuccessResponse(
          response,
          statusCode.HTTP_OK,
          true,
          'Payment status of invoice updated!',
          null,
        );
      }
      /**
       * send email to admin
       */
      return ResponseHandler.ErrorResponse(
        response,
        statusCode.HTTP_BAD_REQUEST,
        true,
        'Unable to verify payment',
      );
    } catch (error) {
      return ResponseHandler.ServerErrorResponse(response);
    }
  };
}
export default InvoiceController;
