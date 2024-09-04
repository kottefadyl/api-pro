import {IsEmail,IsNotEmpty,IsString,MinLength} from 'class-validator'

export class LoginDto{
    @IsNotEmpty()
    @IsEmail({},{message: 'please enter correct email'})
    readonly email: string;

    @IsNotEmpty()
    @IsString(
        {
          message: "the pass word can be in oder type than string"
        }
        )
    @MinLength(4,{message:"password most be contain 5 caracter or more than"})
    readonly password: string;
}

