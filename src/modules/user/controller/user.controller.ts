import { Request, Response } from 'express';
import * as statusCode from '../../../utils/status-codes/http-status-codes';
import ResponseHandler from '../../../utils/response-handlers/ResponseHandler';
import ClientService from '../../client/service/client.service';

class UserController {
  public getUserClients = async (request: Request, response: Response) => {
    try {
      const clients = await ClientService.getUserClients(request.user.id);
      if (clients) {
        return ResponseHandler.SuccessResponse(
          response,
          statusCode.HTTP_OK,
          true,
          'Fetch User Client',
          { clients },
        );
      }
      return ResponseHandler.ErrorResponse(
        response,
        statusCode.HTTP_BAD_REQUEST,
        false,
        'Unable to fetch user clients',
      );
    } catch (error) {
      return ResponseHandler.ServerErrorResponse(response);
    }
  };
}
export default UserController;
