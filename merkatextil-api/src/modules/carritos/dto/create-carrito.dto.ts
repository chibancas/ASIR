import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Cliente } from 'src/modules/clientes/entities/cliente.entity';

export class CreateCarritoDto {
  @IsNumber()
  @IsOptional()
  cantidad?: number;

  @IsString()
  @IsOptional()
  cliente: Cliente;
}
