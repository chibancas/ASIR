import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @Length(9, 9, { message: 'NIF debe tener 9 caracteres.' })
  @Matches(/^\d{8}[A-Z]$/, {
    message: 'El NIF debe contener 8 números seguidos de una letra mayúscula',
  })
  nif: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).*$/, {
    message:
      'La contraseña debe contener al menos una mayúscula, un carácter especial y un número',
  })
  password: string;

  @IsPhoneNumber()
  @IsOptional()
  telefono?: string;

  @IsString()
  nombre: string;

  @IsString()
  apellidos: string;

  @IsString()
  @IsOptional()
  ciudad?: string;

  @IsString()
  @IsOptional()
  direccion?: string;
}
