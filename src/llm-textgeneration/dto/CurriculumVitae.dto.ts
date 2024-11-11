import { IsString,IsNumber, IsArray, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

import { CVFieldDTO } from './CVField.dto';

export class CurriculumVitaeDTO{
    @IsNumber()
    readonly cvId: number;

    @IsString()
    readonly token: string;

    @IsArray()
    //@ArrayNotEmpty()
    @ValidateNested({ each: true }) //cada elemento del array debe validarse por las reglas del DTO
    @Type(() => CVFieldDTO) //cada elemento del array se puede transformar a un tipo CVFieldDTO
    readonly cvFieldsDTOs: CVFieldDTO[];

    constructor(cvId: number, token: string, cvfields: CVFieldDTO[]) {
        this.cvId = cvId;
        this.token = token;
        this.cvFieldsDTOs = cvfields;
    }
}