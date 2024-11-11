import { Test, TestingModule } from '@nestjs/testing';
import { LlmTextgenerationService } from './llm-textgeneration.service';

describe('LlmTextgenerationService', () => {
  let service: LlmTextgenerationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LlmTextgenerationService],
    }).compile();

    service = module.get<LlmTextgenerationService>(LlmTextgenerationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
