import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateRegiduriaDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  nombre: string;
}
