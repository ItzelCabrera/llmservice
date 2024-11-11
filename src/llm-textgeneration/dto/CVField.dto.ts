import {IsString} from 'class-validator';

export class CVFieldDTO{
    @IsString()
    readonly field: string;

    @IsString()
    readonly level: string;

    @IsString()
    readonly category: string;

    constructor(field:string, level: string, category:string) {
        this.field = field;
        this.level = level;
        this.category = category;
    }
}