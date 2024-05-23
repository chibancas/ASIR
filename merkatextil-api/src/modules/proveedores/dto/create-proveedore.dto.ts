import { IsOptional, IsPhoneNumber, IsString, Length, Matches, isString } from "class-validator"

export class CreateProveedoreDto {
    @IsString()
    @Length(9,9,{message:"CIF debe contener 9 caracteres."})
    @Matches(/^[A-Z]\d{8}$/,{
        message: "CIF debe empezar con una mayúscula seguida de 8 números."
    })
    cif:string

    @IsString()
    nombre:string

    @IsString()
    @IsOptional()
    direccion?:string

    @IsString()
    @IsOptional()
    @IsPhoneNumber('ES',{message:"El nº de tlf debe de España."})
    telefono?:string

}
