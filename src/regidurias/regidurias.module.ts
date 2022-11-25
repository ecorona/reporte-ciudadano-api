import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RegiduriasService } from './regidurias.service';
import { RegiduriasController } from './regidurias.controller';
import { RegiduriasRepository } from './regidurias.repository';
import { Regiduria } from './entities/regiduria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Regiduria])],
  controllers: [RegiduriasController],
  providers: [RegiduriasService, RegiduriasRepository],
})
export class RegiduriasModule {}
