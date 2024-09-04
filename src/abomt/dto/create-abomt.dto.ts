import { IsNotEmpty, IsString, IsNumber, IsDate } from "class-validator";

export class CreateAbomtDto {

    @IsString()
    @IsNotEmpty()
    readonly intituler: string

    @IsNotEmpty()
    @IsNumber()
    readonly prix: number

    @IsNotEmpty()
    @IsNotEmpty()
    readonly duree: number

    @IsString()
    @IsNotEmpty()
    readonly description: string

}
