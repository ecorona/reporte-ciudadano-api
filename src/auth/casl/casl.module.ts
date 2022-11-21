import { Global, Module } from '@nestjs/common';
import { CaslCiudadanoAbilityFactory } from './casl-ciudadano-ability.factory';
@Global()
@Module({
  providers: [CaslCiudadanoAbilityFactory],
  exports: [CaslCiudadanoAbilityFactory],
})
export class CaslModule {}
