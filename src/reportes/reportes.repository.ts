import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpcionesPaginacionReporte } from './dto/opciones-paginacion-reporte.dto';
import { Reporte } from './entities/reporte.entity';

export class ReporteRepository extends Repository<Reporte> {
  constructor(@InjectRepository(Reporte) reporte: Repository<Reporte>) {
    super(reporte.target, reporte.manager, reporte.queryRunner);
  }
  paginate(options: OpcionesPaginacionReporte) {
    const { limit, offset } = options;
    return this.find({
      take: limit,
      skip: offset,
      relations: ['tipoReporte', 'ciudadano'],
    });
  }
}
