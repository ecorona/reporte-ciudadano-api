import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class LoginCiudadanoRequest {
  @ApiProperty({
    description: 'El email del ciudadano',
    example: 'juan@live.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'El password del ciudadano',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Si el ciudadano quiere que se recuerde su sesión',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  recuerdame?: boolean;
}
