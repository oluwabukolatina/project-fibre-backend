import { Request, Response } from 'express';
import ResponseHandler from '../../../utils/response-handlers/ResponseHandler';
import DummyRepository from '../service/dummy.repository';

class DummyController {
  public createDummy = async ({ body }: Request, res: Response) => {
    const dummy = await DummyRepository.create(body);
    if (!dummy) ResponseHandler.ErrorResponse(res, 400, false, 'try again');
  };
}
export default DummyController;
