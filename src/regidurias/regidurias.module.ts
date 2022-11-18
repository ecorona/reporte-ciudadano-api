import { Module } from '@nestjs/common';
import { RegiduriasService } from './regidurias.service';
import { RegiduriasController } from './regidurias.controller';

@Module({
  controllers: [RegiduriasController],
  providers: [RegiduriasService]
})
export class RegiduriasModule {}
