import { Inject, Injectable, OnModuleInit} from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import OpenAI from "openai";

import { CreateLlmTextgenerationDto } from './dto/create-llm-textgeneration.dto';
import { UpdateLlmTextgenerationDto } from './dto/update-llm-textgeneration.dto';
import { generateQuestionsUseCase } from './use-cases/generateQuestions.use-case';
import { scoreAnswersUseCase } from './use-cases/scoreAnswers.use-case';
import { QuestionsJoinAnswersDTO } from './dto/QuestionsJoinAnswers.dto';
import { CVJoinFieldDTO } from './dto/CVJoinFieldDTO.dto';

@Injectable()
export class LlmTextgenerationService{
  private openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
  });

  constructor(
    @Inject('LLM-SERVICE') private readonly authClient: ClientKafka,
  ){}

  /*create(createLlmTextgenerationDto: CreateLlmTextgenerationDto) {
    return 'This action adds a new llmTextgeneration';
  }

  findAll() {
    return `This action returns all llmTextgeneration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} llmTextgeneration`;
  }

  update(id: number, updateLlmTextgenerationDto: UpdateLlmTextgenerationDto) {
    return `This action updates a #${id} llmTextgeneration`;
  }

  remove(id: number) {
    return `This action removes a #${id} llmTextgeneration`;
  }*/

  async generateQuestions(cvJoinFieldDTO:CVJoinFieldDTO){
    console.log('input:', JSON.stringify(cvJoinFieldDTO));
    console.log(this.openai.apiKey)
    const questions =  await generateQuestionsUseCase(this.openai, cvJoinFieldDTO);
    console.log('output:', JSON.stringify(questions));
    this.authClient.emit('questionsPublishJSON',JSON.stringify(questions));
  }

  async scoreAnswers(questionsJoinAnswersDTO:QuestionsJoinAnswersDTO){
    console.log('input:', JSON.stringify(questionsJoinAnswersDTO));
    console.log(this.openai.apiKey)
    const scores =  await scoreAnswersUseCase(this.openai, questionsJoinAnswersDTO);
    console.log('output:', JSON.stringify(scores));
    this.authClient.emit('answersScoresPublishJSON',JSON.stringify(scores));
  }
}
