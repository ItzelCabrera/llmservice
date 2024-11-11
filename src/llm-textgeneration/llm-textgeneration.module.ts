import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { LlmTextgenerationService } from './llm-textgeneration.service';
import { LlmTextgenerationController } from './llm-textgeneration.controller';

@Module({
  imports:[
    ClientsModule.register([
      {
        name:'LLM-SERVICE',
        transport: Transport.KAFKA, 
        options:{
          client:{
            clientId:'llm',
            brokers:['localhost:9092']
          },
          consumer:{
            groupId:'llm-service'
          }
        }
      }
    ])
  ],
  controllers: [LlmTextgenerationController],
  providers: [LlmTextgenerationService],
})
export class LlmTextgenerationModule {}
