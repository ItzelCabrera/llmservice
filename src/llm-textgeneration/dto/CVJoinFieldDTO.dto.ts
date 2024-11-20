import { IsString,IsNumber, IsArray, ValidateNested } from "class-validator";
import { Type, Expose } from 'class-transformer';

import { CVFieldDTO } from './CVField.dto';

export class CVJoinFieldDTO{
    @IsNumber()
    readonly userId: number;

    @IsArray()
    //@ArrayNotEmpty()
    @ValidateNested({ each: true }) //cada elemento del array debe validarse por las reglas del DTO
    @Type(() => CVFieldDTO) //cada elemento del array se puede transformar a un tipo CVFieldDTO
    readonly cvFieldsDTOs: CVFieldDTO[];

    constructor() {
    
    }
}