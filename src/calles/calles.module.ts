import { Module } from '@nestjs/common';
import { CallesService } from './calles.service';
import { CallesController } from './calles.controller';

@Module({
  controllers: [CallesController],
  providers: [CallesService]
})
export class CallesModule {}
