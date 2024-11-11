import { PartialType } from '@nestjs/mapped-types';
import { CreateLlmTextgenerationDto } from './create-llm-textgeneration.dto';

export class UpdateLlmTextgenerationDto extends PartialType(CreateLlmTextgenerationDto) {}
