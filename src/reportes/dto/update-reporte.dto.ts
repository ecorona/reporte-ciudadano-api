import { PartialType } from '@nestjs/swagger';
import { CreateReporteDto } from './create-reporte.dto';

export class UpdateReporteDto extends PartialType(CreateReporteDto) {}
