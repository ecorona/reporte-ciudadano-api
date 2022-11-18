import { Module } from '@nestjs/common';
import { ComunicadosService } from './comunicados.service';
import { ComunicadosController } from './comunicados.controller';

@Module({
  controllers: [ComunicadosController],
  providers: [ComunicadosService]
})
export class ComunicadosModule {}
