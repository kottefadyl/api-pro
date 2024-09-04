import { IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { User } from "src/auth/schema/user.schema";


export class CreateInstitutionDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    
    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsString()
    @IsEmpty({message: "you can't pass the user id"})
    readonly byUser: User;

    @IsString()
    institutionImg?: string;
}
