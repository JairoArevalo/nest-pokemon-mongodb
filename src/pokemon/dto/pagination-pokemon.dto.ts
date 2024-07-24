import { IsNumber, IsOptional, IsPositive } from "class-validator";


export class PaginationPokemonDto {
    @IsOptional()
    @IsPositive()
    @IsNumber()
    limit?: number;
    @IsOptional()
    @IsPositive()
    @IsNumber()
    offset?: number;
}