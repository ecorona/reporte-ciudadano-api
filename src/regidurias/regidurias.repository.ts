import { Regiduria } from './entities/regiduria.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
@Injectable()
export class RegiduriasRepository extends Repository<Regiduria> {
  constructor(
    @InjectRepository(Regiduria)
    regiduria: Repository<Regiduria>,
  ) {
    super(regiduria.target, regiduria.manager, regiduria.queryRunner);
  }
}
