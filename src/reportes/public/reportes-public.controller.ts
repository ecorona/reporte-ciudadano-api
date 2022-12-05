import { SesionCiudadano } from '@root/auth/decorators/sesion-ciudadano.decorator';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ReportesService } from '../reportes.service';
import { CreateReporteDto } from '../dto/create-reporte.dto';
import { ApiTags } from '@nestjs/swagger';
import { Ciudadano } from '@root/ciudadanos/entities/ciudadano.entity';
import { Public } from '@root/auth/decorators/public.decorator';
import { OpcionesPaginacionReporte } from '../dto/opciones-paginacion-reporte.dto';

@Controller('reportes')
@ApiTags('reportes')
@Public()
export class ReportesPublicController {
  constructor(private readonly reportesService: ReportesService) {}

  @Post()
  create(
    @Body() createReporteDto: CreateReporteDto,
    @SesionCiudadano() ciudadano: Ciudadano,
  ) {
    return this.reportesService.createPublic(createReporteDto, ciudadano);
  }

  @Get()
  paginate(@Query() options: OpcionesPaginacionReporte) {
    return this.reportesService.paginatePublic(options);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reportesService.findOne(id);
  }
}
