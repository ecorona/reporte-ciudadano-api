import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslCiudadanoAbilityFactory } from '@root/auth/casl/casl-ciudadano-ability.factory';
import { AdminCiudadanosController } from './admin-ciudadanos/admin-ciudadanos.controller';
import { CiudadanoRepository } from './ciudadanos.repository';
import { CiudadanosService } from './ciudadanos.service';
import { Ciudadano } from './entities/ciudadano.entity';
import { PrivateCiudadanosController } from './private-ciudadanos/private-ciudadanos.controller';
import { PublicCiudadanosController } from './public-ciudadanos/public-ciudadanos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudadano])],
  controllers: [
    AdminCiudadanosController,
    PublicCiudadanosController,
    PrivateCiudadanosController,
  ],
  providers: [
    CiudadanoRepository,
    CiudadanosService,
    CaslCiudadanoAbilityFactory,
  ],
  exports: [CiudadanoRepository, CiudadanosService, TypeOrmModule],
})
export class CiudadanosModule {}
