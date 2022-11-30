import { CommonEntity } from '@root/common/common-entity.abstract';
import { TiposReporte } from './tipos-reporte.entity';
import { Ciudadano } from '@root/ciudadanos/entities/ciudadano.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('reportes_ciudadanos')
export class Reporte extends CommonEntity {
  @Column({
    type: 'datetime',
    nullable: false,
  })
  fecha: Date;

  @Column({
    type: 'text',
  })
  descripcion: string;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  direccion: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 8,
    nullable: true,
  })
  lat: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 8,
    nullable: true,
  })
  lng: number;

  @ManyToOne(() => Ciudadano, { nullable: true })
  ciudadano: Ciudadano;

  @Column({
    type: 'int',
    nullable: true,
  })
  ciudadanoId: number;

  @ManyToOne(() => TiposReporte, { nullable: false })
  tipoReporte: TiposReporte;

  @Column({
    type: 'int',
    nullable: false,
  })
  tipoReporteId: number;
}
