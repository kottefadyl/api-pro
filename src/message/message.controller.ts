import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, Req, UploadedFile } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthGuard } from '@nestjs/passport';
import { multerConfig } from 'src/common/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('send')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async create(
    @Body() createMessageDto: CreateMessageDto,
    @Req() req,
    @UploadedFile() file: Express.Multer.File
) {
  console.log(createMessageDto);
  if (file) {
    createMessageDto.file = file.path;
  }
    console.log(createMessageDto);
    
    return this.messageService.create(createMessageDto, req.user);
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
