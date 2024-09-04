import { IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { User } from "src/auth/schema/user.schema";
import { Discus } from "src/discussion/schema/discussion.schema";

export class CreateMessageDto {

    @IsString()
    readonly text?: string;

    @IsString()
    sender?: User;

    @IsString()
    @IsNotEmpty()
    readonly reciver: User;

    @IsString()
    file?: string;

    @IsString()
    @IsEmpty()
    discus: Discus;

}
