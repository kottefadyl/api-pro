import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DomaineService } from './domaine.service';
import { CreateDomaineDto } from './dto/create-domaine.dto';
import { UpdateDomaineDto } from './dto/update-domaine.dto';

@Controller('domaine')
export class DomaineController {
  constructor(private readonly domaineService: DomaineService) {}

  @Post('create')
  create(@Body() createDomaineDto: CreateDomaineDto) {
    return this.domaineService.create(createDomaineDto);
  }

  @Get()
  findAll() {
    return this.domaineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.domaineService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDomaineDto: UpdateDomaineDto) {
    return this.domaineService.update(+id, updateDomaineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.domaineService.remove(+id);
  }
}
