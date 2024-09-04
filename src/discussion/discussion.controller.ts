import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('discussion')
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}

  // @Post()
  // create(@Body() createDiscussionDto: CreateDiscussionDto) {
  //   return this.discussionService.create(createDiscussionDto);
  // }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@Req() req,) {
    if (!req.user) {
      throw new UnauthorizedException('login first')
    }
    return this.discussionService.findAll(req.user._id);
  }

  @Get("message/:id")
  @UseGuards(AuthGuard())
  getDiscussionDetails(@Req() req,@Param('id') idDiscus: string) {
    if (!req.user) {
      throw new UnauthorizedException('login first')
    }
    return this.discussionService.getDiscussionDetails(idDiscus,req.user._id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.discussionService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDiscussionDto: UpdateDiscussionDto) {
  //   return this.discussionService.update(+id, updateDiscussionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.discussionService.remove(+id);
  // }
}
