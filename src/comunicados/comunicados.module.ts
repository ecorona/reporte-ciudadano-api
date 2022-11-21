import { CiudadanosModule } from './../ciudadanos/ciudadanos.module';
import { CiudadanosService } from './../ciudadanos/ciudadanos.service';
import { Module } from '@nestjs/common';
import { ComunicadosService } from './comunicados.service';
import { ComunicadosController } from './comunicados.controller';

@Module({
  imports: [CiudadanosModule],
  controllers: [ComunicadosController],
  providers: [ComunicadosService, CiudadanosService],
})
export class ComunicadosModule {}
