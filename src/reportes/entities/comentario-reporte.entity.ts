import { CommonEntity } from '@root/common/common-entity.abstract';
import { Ciudadano } from '@root/ciudadanos/entities/ciudadano.entity';
import {
  Column,
  Entity,
  ManyToOne,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { Reporte } from './reporte.entity';

@Entity('comentarios_reportes')
@Tree('closure-table')
export class ComentarioReporte extends CommonEntity {
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

  @ManyToOne(() => Ciudadano, { nullable: true })
  ciudadano: Ciudadano;

  @Column({
    type: 'int',
    nullable: true,
  })
  ciudadanoId: number;

  @TreeParent()
  parent: ComentarioReporte;

  @TreeChildren()
  children: ComentarioReporte[];
}
