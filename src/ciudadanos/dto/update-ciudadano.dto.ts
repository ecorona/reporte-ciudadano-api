import { OmitType } from '@nestjs/swagger';
import { CreateCiudadanoDto } from './create-ciudadano.dto';

export class UpdateCiudadanoDto extends OmitType(CreateCiudadanoDto, [
  'password',
  'roles',
  'email',
]) {}
