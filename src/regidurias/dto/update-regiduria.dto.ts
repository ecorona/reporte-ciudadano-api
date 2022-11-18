import { PartialType } from '@nestjs/swagger';
import { CreateRegiduriaDto } from './create-regiduria.dto';

export class UpdateRegiduriaDto extends PartialType(CreateRegiduriaDto) {}
