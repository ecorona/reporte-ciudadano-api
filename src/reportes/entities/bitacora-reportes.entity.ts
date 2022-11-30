import { CommonEntity } from '@root/common/common-entity.abstract';
import { Ciudadano } from '@root/ciudadanos/entities/ciudadano.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Reporte } from './reporte.entity';

@Entity('bitacora_reportes')
export class BitacoraReportes extends CommonEntity {
  @Column({
    type: 'datetime',
    nullable: false,
  })
  fecha: Date;

  @Column({
    type: 'text',
  })
  descripcion: string;

  @ManyToOne(() => Reporte, { nullable: false })
  reporte: Reporte;

  @Column({
    type: 'int',
    nullable: false,
  })
  reporteId: number;

  @ManyToOne(() => Ciudadano, { nullable: false })
  ciudadano: Ciudadano;

  @Column({
    type: 'int',
    nullable: false,
  })
  ciudadanoId: number;
}
