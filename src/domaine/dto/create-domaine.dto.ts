import { IsArray, IsNotEmpty, IsString, ValidateNested, ArrayNotEmpty, IsNumber } from "class-validator";

export class CreateDomaineDto {

    @IsString()
    @IsNotEmpty()
    readonly intitule: string

    @IsNotEmpty()
    @IsNumber()
    readonly prixDvF: number

    @IsNotEmpty()
    @IsNumber()
    readonly prixAf: number

    @IsNotEmpty()
    @IsNumber()
    readonly frequenceMaj: number

    @IsString()
    readonly imgDomaine: string

}
