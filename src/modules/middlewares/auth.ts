import jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import ResponseHandler from '../../utils/response-handlers/ResponseHandler';
import * as statusCodes from '../../utils/status-codes/http-status-codes';
import { APP_JWT_SECRET } from '../../config/secrets';

function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header('X-Auth-Token');
  if (!token)
    return ResponseHandler.ErrorResponse(
      res,
      statusCodes.HTTP_UNAUTHORIZED,
      false,
      'No Token Found. Authorization Denied',
    );

  try {
    /**
     * add user fromm the payload
     */
    req.user = jwt.verify(token, APP_JWT_SECRET);
    return next();
  } catch (e) {
    return ResponseHandler.ErrorResponse(
      res,
      statusCodes.HTTP_BAD_REQUEST,
      false,
      'Token Is Not Valid',
    );
  }
}
export default auth;
