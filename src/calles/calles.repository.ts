import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calle } from './entities/calle.entity';

export class CallesRepository extends Repository<Calle> {
  constructor(
    @InjectRepository(Calle)
    private readonly calle: Repository<Calle>,
  ) {
    super(calle.target, calle.manager, calle.queryRunner);
  }
}
