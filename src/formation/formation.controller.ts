import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Req } from '@nestjs/common';
import { FormationService } from './formation.service';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('formation')
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  @Post("create")
  @UseGuards(AuthGuard())
  create(@Body() createFormationDto: CreateFormationDto, @Req() req) {
    return this.formationService.create(createFormationDto, req.user);
  }

  @Get()
  findAll() {
    return this.formationService.findAll();
  }

  @Get()
  findAllByInstitution() {
    return this.formationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormationDto: UpdateFormationDto) {
    return this.formationService.update(+id, updateFormationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formationService.remove(+id);
  }
}
