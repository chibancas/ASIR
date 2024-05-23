import { IsOptional, IsString } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
