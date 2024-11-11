import {IsString} from 'class-validator';

export class QuestionDTO{
    @IsString()
    readonly bodyQuestion: string;
}