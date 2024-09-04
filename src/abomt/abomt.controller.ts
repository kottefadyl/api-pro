import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AbomtService } from './abomt.service';
import { CreateAbomtDto } from './dto/create-abomt.dto';
import { UpdateAbomtDto } from './dto/update-abomt.dto';

@Controller('abomt')
export class AbomtController {
  constructor(private readonly abomtService: AbomtService) {}

  @Post()
  create(@Body() createAbomtDto: CreateAbomtDto) {
    return this.abomtService.create(createAbomtDto);
  }

  @Get()
  findAll() {
    return this.abomtService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.abomtService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAbomtDto: UpdateAbomtDto) {
    return this.abomtService.update(+id, updateAbomtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.abomtService.remove(+id);
  }
}
