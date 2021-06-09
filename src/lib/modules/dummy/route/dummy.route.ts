import DummyController from '../controller/dummy.controller';

class DummyRoutes {
  public dummyController: DummyController = new DummyController();

  public routes = (app: any): void => {
    const PLANS_URL = '/api/v1/awabah/dummy';
    app.route(`${PLANS_URL}`).get(this.dummyController.createDummy);
  };
}
export default DummyRoutes;
