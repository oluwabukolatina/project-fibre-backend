import { Response } from 'express';

export default class ResponseHandler {
  static ErrorResponse(
    res: Response,
    statusCode: number,
    status: boolean,
    message = '',
  ) {
    return res.status(statusCode).json({ message, status });
  }

  static SuccessResponse(
    res: Response,
    statusCode: number,
    status: boolean,
    message = '',
    data: any,
  ) {
    return res.status(statusCode).json({ message, status, data });
  }
}
