import { Test, TestingModule } from '@nestjs/testing';
import { SlackApiController } from './slack-api.controller';

describe('SlackApiController', () => {
  let controller: SlackApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlackApiController],
    }).compile();

    controller = module.get<SlackApiController>(SlackApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
