import { Test, TestingModule } from '@nestjs/testing';
import { LlmTextgenerationController } from './llm-textgeneration.controller';
import { LlmTextgenerationService } from './llm-textgeneration.service';

describe('LlmTextgenerationController', () => {
  let controller: LlmTextgenerationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LlmTextgenerationController],
      providers: [LlmTextgenerationService],
    }).compile();

    controller = module.get<LlmTextgenerationController>(LlmTextgenerationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
