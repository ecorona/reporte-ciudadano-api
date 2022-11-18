import { CommonEntity } from '../../common/common-entity.abstract';
import { Ciudadano } from '../../ciudadanos/entities/ciudadano.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('colonias')
export class Colonia extends CommonEntity {
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  nombre: string;

  @ManyToOne(() => Ciudadano, { nullable: false })
  ciudadanoFundador: Ciudadano;

  @Column({
    type: 'int',
    nullable: false,
  })
  ciudadanoFundadorId: number;

  @ManyToOne(() => Ciudadano, { nullable: false })
  ciudadanoAdministrador: Ciudadano;

  @Column({
    type: 'int',
    nullable: false,
  })
  ciudadanoAdministradorId: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  activo: boolean;
}
