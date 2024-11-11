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
      apiKey: '',
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
    console.log('service ' + cvJoinFieldDTO);
    const questions =  await generateQuestionsUseCase(this.openai, cvJoinFieldDTO);
    console.log('service ' + questions)
    this.authClient.emit('questionsPublishJSON',JSON.stringify(questions));
  }

  async scoreAnswers(questionsJoinAnswersDTO:QuestionsJoinAnswersDTO){
    console.log('service ' + questionsJoinAnswersDTO);
    const scores =  await scoreAnswersUseCase(this.openai, questionsJoinAnswersDTO);
    console.log(scores)
    this.authClient.emit('answersScoresPublishJSON',JSON.stringify(scores));
  }
}
