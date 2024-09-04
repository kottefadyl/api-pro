import { PartialType } from '@nestjs/mapped-types';
import { CreateDomaineDto } from './create-domaine.dto';

export class UpdateDomaineDto extends PartialType(CreateDomaineDto) {}
