import {IsEmail,IsNotEmpty,IsString,MinLength, MaxLength, IsBoolean, IsEmpty} from 'class-validator'

export class SignUpDto{
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly firstname: string;

    @IsNotEmpty()
    @IsEmail({},{message: 'please enter correct email'})
    readonly email: string;

    @IsNotEmpty()
    @IsString({message:" entrer une chaine "})
    @MinLength(5)
    @MaxLength(12,{message:"you can't inter mor than 5 caracter in your password"})
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    readonly status: string

 
    @IsString()
    profileImg? : string

    @IsString()
    @IsEmpty()
    readonly abomt: string
}


export const jwtConstants = {
    secret: 'SOURCECODE.',
};
  

