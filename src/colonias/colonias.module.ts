import { Module } from '@nestjs/common';
import { ColoniasService } from './colonias.service';
import { ColoniasController } from './colonias.controller';

@Module({
  controllers: [ColoniasController],
  providers: [ColoniasService]
})
export class ColoniasModule {}
