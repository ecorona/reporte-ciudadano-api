import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { ReportesPublicController } from './public/reportes-public.controller';
import { Reporte } from './entities/reporte.entity';
import { ReporteRepository } from './reportes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Reporte])],
  controllers: [ReportesPublicController],
  providers: [ReporteRepository, ReportesService],
  exports: [ReportesService],
})
export class ReportesModule {}
