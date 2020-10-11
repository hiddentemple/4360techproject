import {Test, TestingModule} from '@nestjs/testing';
import {AppController, HealthResponse} from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const expectedResponse: HealthResponse = { health: "200 OK" };
      expect(appController.getHealth()).toBe(expectedResponse);
    });
  });
});
