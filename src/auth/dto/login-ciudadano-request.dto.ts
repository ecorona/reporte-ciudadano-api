import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

/**
 * Datos de inicio de sesión de un ciudadano
 */
export class LoginCiudadanoRequest {
  /**
   * Correo electrónico del ciudadano
   */
  @ApiProperty({
    description: 'El email del ciudadano',
    example: 'juan@live.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * Contraseña del ciudadano
   */
  @ApiProperty({
    description: 'El password del ciudadano',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  /**
   * Indica si el ciudadano quiere que se recuerde su sesión
   */
  @ApiProperty({
    description: 'Si el ciudadano quiere que se recuerde su sesión',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  recuerdame?: boolean;
}
