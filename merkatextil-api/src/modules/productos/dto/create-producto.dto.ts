import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Categoria } from 'src/modules/categorias/entities/categoria.entity';
import { Proveedore } from 'src/modules/proveedores/entities/proveedore.entity';

export class CreateProductoDto {
  @IsString()
  nombre: string;

  @IsNumber()
  precio: number;

  @IsNumber()
  @IsOptional()
  existencias?: number;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  proveedor: Proveedore;

  @IsUUID()
  categoria: Categoria;
}
