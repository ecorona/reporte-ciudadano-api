import { TypeOrmModule } from '@nestjs/typeorm';
import { CallesRepository } from './calles.repository';
import { Module } from '@nestjs/common';
import { CallesService } from './calles.service';
import { CallesController } from './calles.controller';
import { Calle } from './entities/calle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Calle])],
  controllers: [CallesController],
  providers: [CallesService, CallesRepository],
  exports: [CallesService],
})
export class CallesModule {}
