import { IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { User } from "src/auth/schema/user.schema";


export class CreateModuloDto {
    @IsString()
    @IsNotEmpty()
    readonly titre: string

    @IsString()
    readonly description: string

    @IsString()
    @IsEmpty({message: "you can't pass the user id"})
    readonly byUser: User

    @IsString()
    @IsNotEmpty()
    readonly formationId: string
}
