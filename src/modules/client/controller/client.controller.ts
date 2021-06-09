import { Request, Response } from 'express';
import ResponseHandler from '../../../utils/response-handlers/ResponseHandler';
import ClientService from '../service/client.service';
import * as statusCode from '../../../utils/status-codes/http-status-codes';
import UserServices from '../../user/services/UserServices';

class ClientController {
  public createClient = async ({ body, user }: Request, res: Response) => {
    try {
      const client = await ClientService.createClient(body);
      if (client._id) {
        // add to the user
        const add = await UserServices.saveClientToUser(client, user.id);
        if (add._id) {
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
          'Unable to save client on user',
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
