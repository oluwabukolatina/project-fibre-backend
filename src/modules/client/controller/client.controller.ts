import { Request, Response } from 'express';
import ResponseHandler from '../../../utils/response-handlers/ResponseHandler';
import ClientService from '../service/client.service';
import * as statusCode from '../../../utils/status-codes/http-status-codes';

class ClientController {
  /**
   *
   * @param param0
   * @param res
   * @returns
   * real email should be used so as to see the invoce that is sent to the user. alternatively a mailtrap credentials can be added to the nodemailer file
   */
  public createClient = async ({ body, user }: Request, res: Response) => {
    try {
      const client = await ClientService.createClient({
        name: body.name,
        email: body.email,
        owner: user.id,
      });
      if (client._id) {
        return ResponseHandler.SuccessResponse(
          res,
          statusCode.HTTP_CREATED,
          true,
          'Created Client',
          { client },
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
export default ClientController;
