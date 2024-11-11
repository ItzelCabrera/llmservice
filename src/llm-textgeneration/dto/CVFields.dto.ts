import { IsString, IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CVFieldDTO } from './CVField.dto';

export class CVFieldsDTO{
    @IsArray()
    //@ArrayNotEmpty()
    @ValidateNested({ each: true }) //cada elemento del array debe validarse por las reglas del DTO
    @Type(() => CVFieldDTO) //cada elemento del array se puede transformar a un tipo CVFieldDTO
    readonly cvFieldsDTOs: CVFieldDTO[];
}