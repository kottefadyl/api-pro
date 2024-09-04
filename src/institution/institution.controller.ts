// src/institution/institution.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, BadRequestException, UseInterceptors, UploadedFile, UnauthorizedException } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfigForImages } from '../common/multer.config';  // Assurez-vous que le chemin est correct
import { InstitutionSerch } from './dto/institution-serch.dto';

@Controller('institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Post('create')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('photo', multerConfigForImages))
  async create(
    @Body() createInstitutionDto: CreateInstitutionDto,
    @Req() req,
    @UploadedFile() photo: Express.Multer.File
  ) {
    if (photo) {
      createInstitutionDto.institutionImg = photo.path;
    }
    return this.institutionService.create(createInstitutionDto, req.user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(
    @Req() req,
  ) {
    if (!req.user) {
      throw new UnauthorizedException("login first")
    }
    return this.institutionService.findAll(req.user);
  }

  @Get('integrate/:id')
  @UseGuards(AuthGuard())
  integrate(@Req() req, @Param('id') id: string) {
    return this.institutionService.integrate(req.user, id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.institutionService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  addDomaine(@Param('id') idInst: string, @Body() idDoms: any, @Req() req) {
    return this.institutionService.addDomaineService(idInst, idDoms, req.user);
  }

  // @Patch(':id')
  // addDomaine(@Param('id') id: string, @Body() updateInstitutionDto: UpdateInstitutionDto) {
  //   return this.institutionService.update(+id, updateInstitutionDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.institutionService.remove(+id);
  }

  @Get('user/for')
  @UseGuards(AuthGuard())
  async getInstitutionsByUserId(@Req() req) {
    try {
      const institutions = await this.institutionService.findInstitutionsByUserId(req.user._id);
      return institutions;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post("name")
  @UseGuards(AuthGuard())
  async itutionsByName(
    @Body() institutionSerch: InstitutionSerch
  ){
    return await this.institutionService.findInstitutionsByName(institutionSerch.name)
  }
}
