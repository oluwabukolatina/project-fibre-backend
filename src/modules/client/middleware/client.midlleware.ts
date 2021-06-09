import { Response, Request, NextFunction } from 'express';
import Joi from 'joi';
import ResponseHandler from '../../../utils/response-handlers/ResponseHandler';
import { HTTP_BAD_REQUEST } from '../../../utils/status-codes/http-status-codes';

async function validateCreateClient(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
  });
  const { error } = schema.validate(request.body, {
    stripUnknown: true,
  });
  if (error)
    return ResponseHandler.JoiErrorResponse(
      response,
      HTTP_BAD_REQUEST,
      false,
      error.details.map(({ message }: any) => ({
        message: message.replace(/['"]/g, ''),
      })),
      'Unable to create client',
    );
  return next();
}
export default { validateCreateClient };
