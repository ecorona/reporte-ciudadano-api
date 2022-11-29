import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SyslogEntity } from './syslog.entity';
export class SyslogRepository extends Repository<SyslogEntity> {
  constructor(
    @InjectRepository(SyslogEntity)
    private readonly repository: Repository<SyslogEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
