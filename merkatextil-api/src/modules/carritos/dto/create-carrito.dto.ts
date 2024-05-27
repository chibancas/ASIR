import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Cliente } from 'src/modules/clientes/entities/cliente.entity';
import { Producto } from 'src/modules/productos/entities/producto.entity';

export class CreateCarritoDto {
  @IsNumber()
  @IsOptional()
  cantidad?: number;

  @IsString()
  @IsOptional()
  productos?: Producto;

  @IsString()
  @IsOptional()
  cliente?: Cliente;
}
