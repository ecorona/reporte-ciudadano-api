import { Module } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';

@Module({
  controllers: [ReportesController],
  providers: [ReportesService]
})
export class ReportesModule {}
