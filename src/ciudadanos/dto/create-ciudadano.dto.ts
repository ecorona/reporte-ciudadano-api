import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { CIUDADANO_MIN_PASSWORD_LENGTH } from '../../common/constants';
import { Rol } from '../../auth/roles/rol.enum';

export class CreateCiudadanoDto {
  @ApiProperty({
    description: 'El nombre del ciudadano',
    example: 'Juan',
  })
  @IsString()
  @IsOptional()
  nombres?: string;

  @ApiProperty({
    description: 'El apellido del ciudadano',
    example: 'Perez',
  })
  @IsString()
  @IsOptional()
  apellidos?: string;

  @ApiProperty({
    description: 'El apodo del ciudadano',
    example: 'El Chato',
  })
  @IsString()
  @IsNotEmpty()
  alias: string;

  @ApiProperty({
    description: 'El prefijo del país para el teléfono del ciudadano',
    example: '52',
  })
  @IsString()
  @IsOptional()
  prefijoTelefono?: string;

  @ApiProperty({
    description: 'El teléfono del ciudadano',
    example: '1234567890',
  })
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiProperty({
    description: 'El password del ciudadano',
    example: 'password',
  })
  @IsString()
  @MinLength(CIUDADANO_MIN_PASSWORD_LENGTH)
  password: string;

  @ApiProperty({
    description: 'El email del ciudadano',
    example: 'juan@live.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'El rol del ciudadano',
    example: Rol.Ciudadano,
    enum: Rol,
  })
  @IsEnum(Rol)
  @IsOptional()
  roles?: Rol[];
}
