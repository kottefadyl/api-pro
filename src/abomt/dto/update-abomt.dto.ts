import { PartialType } from '@nestjs/mapped-types';
import { CreateAbomtDto } from './create-abomt.dto';

export class UpdateAbomtDto extends PartialType(CreateAbomtDto) {}
