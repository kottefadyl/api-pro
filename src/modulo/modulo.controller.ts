import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ModuloService } from './modulo.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import { AuthGuard } from '@nestjs/passport';
import { log } from 'console';

@Controller('modulo')
export class ModuloController {
  constructor(private readonly moduloService: ModuloService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() createModuloDto: CreateModuloDto, @Req() req ) {
    return this.moduloService.create(createModuloDto, req.user);
  }

  @Get()
  findAll() {
    return this.moduloService.findAll();
  }

  @Get('like/:id')
  @UseGuards(AuthGuard())
  like(@Req() req , @Param('id') id: string){
    return this.moduloService.likeModulo( id, req.user)
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduloService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModuloDto: UpdateModuloDto) {
    return this.moduloService.update(id, updateModuloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduloService.remove(id);
  }
}
