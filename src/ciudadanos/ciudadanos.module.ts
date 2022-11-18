import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CiudadanosService } from './ciudadanos.service';
import { CiudadanoRepository } from './ciudadanos.repository';
import { PublicCiudadanosController } from './public-ciudadanos/public-ciudadanos.controller';
import { AdminCiudadanosController } from './admin-ciudadanos/admin-ciudadanos.controller';
import { CaslCiudadanoAbilityFactory } from '../auth/casl/casl-ciudadano-ability.factory';
import { Ciudadano } from './entities/ciudadano.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudadano])],
  controllers: [AdminCiudadanosController, PublicCiudadanosController],
  providers: [
    CiudadanoRepository,
    CiudadanosService,
    CaslCiudadanoAbilityFactory,
  ],
  exports: [CiudadanoRepository, CiudadanosService],
})
export class CiudadanosModule {}
