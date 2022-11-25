import { Ciudadano } from '../../ciudadanos/entities/ciudadano.entity';
import { CommonEntity } from '../../common/common-entity.abstract';
import { Column, Entity, ManyToOne } from 'typeorm';
@Entity('calles')
export class Calle extends CommonEntity {
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  nombre: string;

  @ManyToOne(() => Ciudadano, { nullable: true })
  ciudadanoFundador?: Ciudadano;

  @Column({
    type: 'int',
    nullable: true,
  })
  ciudadanoFundadorId?: number;

  @ManyToOne(() => Ciudadano, { nullable: true })
  ciudadanoAdministrador?: Ciudadano;

  @Column({
    type: 'int',
    nullable: true,
  })
  ciudadanoAdministradorId?: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  activo?: boolean;
}
