import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LlmTextgenerationModule } from './llm-textgeneration/llm-textgeneration.module';
import { ExampleModule } from './example/example.module';

@Module({
  imports: [LlmTextgenerationModule, ExampleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
