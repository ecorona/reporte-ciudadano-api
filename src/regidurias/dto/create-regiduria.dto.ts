import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { NOMBRE_REGIDURIA_MIN_LENGTH } from '../../common/constants';
export class CreateRegiduriaDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(NOMBRE_REGIDURIA_MIN_LENGTH)
  nombre: string;
}
