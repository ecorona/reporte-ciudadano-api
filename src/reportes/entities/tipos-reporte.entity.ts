import { CommonEntity } from '@root/common/common-entity.abstract';
import { Regiduria } from '@root/regidurias/entities/regiduria.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('tipos_reporte')
export class TiposReporte extends CommonEntity {
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  nombre: string;

  @ManyToOne(() => Regiduria, { nullable: false })
  regiduriaAtiende: Regiduria;

  @Column({
    type: 'int',
    nullable: false,
  })
  regiduriaAtiendeId: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  activo: boolean;
}
