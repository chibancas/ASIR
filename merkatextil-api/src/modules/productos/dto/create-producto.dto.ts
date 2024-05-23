import { IsNumber, IsString } from "class-validator"

export class CreateProductoDto {

    @IsString()
    id: string

    @IsString()
    nombre: string

    @IsNumber()
    precio: number

    @IsNumber()
    existencias?: number

    @IsString()
    descripcion?: string

    // proveedor:Proveedor foranea
    // categoria:Categoria foranea

}
