import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import {User} from './schema/user.schema'
import { Model } from "mongoose";
import {ExtractJwt, Strategy} from 'passport-jwt'
import {jwtConstants} from './dto/signup.dto'




@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ){
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtConstants.secret,
        })
    }

    async validate(playload){
        const {id} = playload;
        const user = await this.userModel.findById(id)
        if(!user){
            throw new UnauthorizedException('Login first to access this endpoint')
        }
        return user
    }
}