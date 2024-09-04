import { IsNotEmpty, IsString } from "class-validator";



export class InstitutionSerch {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}