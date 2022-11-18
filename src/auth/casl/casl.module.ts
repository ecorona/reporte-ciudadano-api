import { Module } from '@nestjs/common';
import { CaslCiudadanoAbilityFactory } from './casl-ciudadano-ability.factory';

@Module({
  providers: [CaslCiudadanoAbilityFactory],
  exports: [CaslCiudadanoAbilityFactory],
})
export class CaslModule {}
