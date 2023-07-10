import { Test, TestingModule } from '@nestjs/testing';
import { SlackApiService } from './slack-api.service';

describe('SlackApiService', () => {
  let service: SlackApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlackApiService],
    }).compile();

    service = module.get<SlackApiService>(SlackApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
