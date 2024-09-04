import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { multerConfigForImages } from '../common/multer.config';  // Assurez-vous que le chemin est correct
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @UseInterceptors(FileInterceptor('photo', multerConfigForImages))
  async create(
    @Body() signUpDto: SignUpDto,
    @UploadedFile() photo: Express.Multer.File
  ) {
    if (photo) {
      signUpDto.profileImg = photo.path;
    }
    console.log(signUpDto);
    return this.authService.signUp(signUpDto);
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log(loginDto);
    return this.authService.login(loginDto);
  }

  @Get('validationToken')
  @UseGuards(AuthGuard())
  async getValigationToken(){
    return true
  }

  @Patch('suscrire/:id')
  @UseGuards(AuthGuard())
  async sabone(
    @Req() req,
    @Param('id') idpro: string
  ) {
    return this.authService.suivre(idpro, req.user);
  }

  @Get('users')
  getAllUser() {
    return this.authService.getAllUser()
  }

  @Get('singleUser/:id')
  @UseGuards(AuthGuard())
  getSingleUser(@Param('id') id: string) {
    return this.authService.getUserById(id)
  }

  @Get('self')
  @UseGuards(AuthGuard())
  getOneUser(@Req() req) {
    return this.authService.getUserById(req.user._id)
  }

  @Get('followed')
  @UseGuards(AuthGuard())
  async getFollowed(
    @Req() req) {
    console.log(req.user);  
    return this.authService.getAllProfollow(req.user)
  }


}
