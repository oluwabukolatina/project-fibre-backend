/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { Request, Response } from 'express';
import Jwt from '../config/jwt';
import * as statusCode from '../../../utils/status-codes/http-status-codes';
import ResponseHandler from '../../../utils/response-handlers/ResponseHandler';
import UserService from '../../user/services/user.service';

class AuthController {
  public loginUser = async (req: Request, res: Response) => {
    const { password, email } = req.body;
    try {
      /*
      check for existing user
      */
      const existingUser = await UserService.findUser({ email });
      /**
       * check password matches
       */
      const compare = await Jwt.comparePassword(
        password,
        existingUser.password,
      );
      if (!compare) {
        ResponseHandler.ErrorResponse(
          res,
          statusCode.HTTP_FORBIDDEN,
          false,
          'Incorrect Credentials',
        );
      }
      const token = await Jwt.createToken(existingUser._id);
      if (!token) {
        return ResponseHandler.ErrorResponse(
          res,
          statusCode.HTTP_BAD_REQUEST,
          false,
          'Unable to create token',
        );
      }
      return ResponseHandler.SuccessResponse(
        res,
        statusCode.HTTP_OK,
        true,
        'Log in successful',
        {
          id: existingUser._id,
          email: existingUser.email,
          token,
        },
      );
    } catch (err) {
      return ResponseHandler.ErrorResponse(
        res,
        statusCode.HTTP_INTERNAL_SERVER_ERROR,
        false,
        'Internal server error happened',
      );
    }
  };

  public register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
      const newUser = await UserService.createUser({ name, email, password });
      if (!newUser) {
        return ResponseHandler.ErrorResponse(
          res,
          statusCode.HTTP_BAD_REQUEST,
          false,
          'Something went wrong while trying to create user account',
        );
      }
      newUser.password = await Jwt.hashPassword(newUser.password);
      const saved = await UserService.saveUser(newUser);
      if (saved) {
        return ResponseHandler.SuccessResponse(
          res,
          statusCode.HTTP_CREATED,
          true,
          'User Created.',
          { email, name },
        );
      }
      return ResponseHandler.ErrorResponse(
        res,
        statusCode.HTTP_BAD_REQUEST,
        false,
        'Unable to save user',
      );
    } catch (err) {
      return ResponseHandler.ServerErrorResponse(res);
    }
  };
}
export default AuthController;
