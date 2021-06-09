/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import UserServices from '../../user/services/UserServices';
import ResponseHandler from '../../../utils/response-handlers/ResponseHandler';
import { HTTP_BAD_REQUEST } from '../../../utils/status-codes/http-status-codes';

/**
 * to sign the user
 * @param body
 * @param res
 * @param next
 */
async function checkIfARegisteredUser(
  { body }: Request,
  res: Response,
  next: NextFunction,
) {
  const { email } = body;
  try {
    const user = await UserServices.findUser({ email });

    if (user) {
      return ResponseHandler.ErrorResponse(
        res,
        HTTP_BAD_REQUEST,
        false,
        'We are sorry. Something went wrong when attempting to sign up',
      );
    }
    return next();
  } catch (e) {
    return ResponseHandler.ServerErrorResponse(res);
  }
}

async function validateRegister(
  { body }: Request,
  res: Response,
  next: NextFunction,
) {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(body, {
    stripUnknown: true,
  });
  if (error)
    return ResponseHandler.JoiErrorResponse(
      res,
      HTTP_BAD_REQUEST,
      false,
      error.details.map(({ message }: any) => ({
        message: message.replace(/['"]/g, ''),
      })),
      'Unable to register',
    );
  return next();
}
async function validateLogin(
  { body }: Request,
  res: Response,
  next: NextFunction,
) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.required(),
  });
  const { error } = schema.validate(body, {
    stripUnknown: true,
  });
  if (!error) {
    return next();
  }
  return ResponseHandler.JoiErrorResponse(
    res,
    HTTP_BAD_REQUEST,
    false,
    error.details.map(({ message }) => ({
      message: message.replace(/['"]/g, ''),
    })),
    'Unable to login',
  );
}
async function checkIfUserExists(
  request: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await UserServices.findUser({
      email: request.body.email,
    });
    if (!user) {
      return ResponseHandler.ErrorResponse(
        res,
        HTTP_BAD_REQUEST,
        false,
        'You have entered an invalid email or password',
      );
    }
    return next();
  } catch (e) {
    return ResponseHandler.ErrorResponse(
      res,
      HTTP_BAD_REQUEST,
      false,
      'Internal server error',
    );
  }
}

export default {
  checkIfARegisteredUser,
  validateRegister,
  validateLogin,
  checkIfUserExists,
};
