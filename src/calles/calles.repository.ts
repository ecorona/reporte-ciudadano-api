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

  async createAndSave(calle: Calle): Promise<Calle> {
    return await this.save(calle);
  }

  findById(id: number): Promise<Calle> {
    return this.findOne({ where: { id } });
  }
}
