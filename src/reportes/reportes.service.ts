import { Reporte } from '@root/reportes/entities/reporte.entity';
import { Injectable, Logger } from '@nestjs/common';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { Ciudadano } from '@root/ciudadanos/entities/ciudadano.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReporteRepository } from './reportes.repository';
import { OpcionesPaginacionReporte } from './dto/opciones-paginacion-reporte.dto';

@Injectable()
export class ReportesService {
  private logger = new Logger(ReportesService.name);

  constructor(
    @InjectRepository(ReporteRepository)
    private readonly reporteRepository: ReporteRepository,
  ) {}

  //TODO: typar retorno
  async createPublic(
    createReporteDto: CreateReporteDto,
    ciudadano: Ciudadano,
  ): Promise<Reporte> {
    const reporteACrear = this.reporteRepository.create({
      ...createReporteDto,
      fecha: new Date(),
      ciudadanoId: ciudadano.id,
    });
    const reporteCreado = await this.reporteRepository.save(reporteACrear);
    //TODO: crear notificaciones
    return reporteCreado;
  }

  //TODO: typar retorno
  paginatePublic(options: OpcionesPaginacionReporte) {
    return this.reporteRepository.paginate(options);
  }

  //TODO: typar retorno
  findOne(id: number) {
    return this.reporteRepository.findOne({ where: { id } });
  }
}
