import {IsInt, IsString} from 'class-validator';

export class QuestionJoinAnswerDTO{
    @IsInt()
    readonly questionId: number;

    @IsString()
    readonly bodyQuestion: string;

    @IsString()
    readonly answerUser: string;

    @IsString()
    readonly answerLLM: string;
}