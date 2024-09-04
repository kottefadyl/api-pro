import { Injectable, HttpException, HttpStatus, RequestTimeoutException, BadRequestException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async signUp(signUpDto: SignUpDto): Promise<{ user: User, token: string }> {
        const { name,firstname, email, password, status, profileImg, abomt } = signUpDto
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await this.userModel.create({
            name,
            firstname,
            email,
            password: hashedPassword,
            status, 
            profileImg,
            abomt
        })
        const token = this.jwtService.sign({ id: user._id })
        return { user, token }
    }

    async login(loginDto: LoginDto): Promise<{ user:User, token: string }> {
        const { email, password } = loginDto
        const user: User = await this.userModel.findOne({ email })
        if (!user) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'Incorrect Email or Password',
            }, HttpStatus.UNAUTHORIZED);
        }
        const IsPasswordMatced = await bcrypt.compare(password, user.password)
        if (!IsPasswordMatced) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'Incorrect Email or Password',
            }, HttpStatus.UNAUTHORIZED);
        }
        await this.userModel.updateOne({ _id: user._id }, { $set: { isLogin: true } });
        const token = this.jwtService.sign({ id: user._id })
        return { user, token }
    }

    async getAllUser():Promise<User[]> {
      return this.userModel.find();
    }

    async suivre(idpro: string, user: User){
        if (!idpro || !user) {
            throw new BadRequestException("need some information")
        }
        if (user.status === "professionel") {
            return new InternalServerErrorException("you have a profrssional account you can't suscribe to any account")
        }
        const idUser = user._id as any

        await this.userModel.updateOne(
            {_id: idUser},
            {$addToSet: {isAbonnésof: idpro}}
        )
        return {
            success: true,
            message:"success"
        }

    }

    async getAllProfollow(user: User): Promise<User[]> {
        const idUser = user._id as any;
    
        // Trouver l'utilisateur dont l'ID est donné
        const currentUser = await this.userModel.findById(idUser).populate('isAbonnésof').exec();
    
        // Retourner tous les utilisateurs dont les _id se trouvent dans isAbonnésof
        return currentUser.isAbonnésof;
      }

      async getUserById(id: string): Promise<User> {
        const user = await this.userModel.findById(id).select('-password').exec();
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;

    }
    
}
