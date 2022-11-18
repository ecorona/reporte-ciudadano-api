import { PartialType } from '@nestjs/swagger';
import { CreateCalleDto } from './create-calle.dto';

export class UpdateCalleDto extends PartialType(CreateCalleDto) {}
