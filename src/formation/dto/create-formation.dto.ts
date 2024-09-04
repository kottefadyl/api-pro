import { IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { Institution } from "src/institution/schema/institution.schema";

export class CreateFormationDto {
    @IsString()
    @IsNotEmpty()
    readonly intituler: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsString()
    @IsEmpty({message: "can't post user"})
    readonly byUser: string;

    @IsString()
    @IsNotEmpty()
    readonly inDomaine: string;
    
    @IsString()
    readonly inInstitut: Institution;
}
