import { SyslogRepository } from './syslog.repository';
import { Module } from '@nestjs/common';
import { SyslogService } from './syslog.service';
import { SyslogController } from './syslog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SyslogEntity } from './syslog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SyslogEntity])],
  providers: [SyslogRepository, SyslogService],
  controllers: [SyslogController],
  exports: [SyslogService],
})
export class SyslogModule {}
