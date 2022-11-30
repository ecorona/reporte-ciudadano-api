import { Ciudadano } from '@root/ciudadanos/entities/ciudadano.entity';
import { Reporte } from '@root/reportes/entities/reporte.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity('comentarios_comunicados')
@Tree('closure-table')
export class ComentarioComunicado {
  @PrimaryGeneratedColumn()
  id: number;

  @TreeParent()
  padre: ComentarioComunicado;

  @TreeChildren()
  hijos: ComentarioComunicado[];

  @Column({
    type: 'text',
  })
  comentario: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Reporte, { nullable: false })
  reporte: Reporte;
  @Column({ type: 'int', nullable: false })
  reporteId: number;

  @ManyToOne(() => Ciudadano, { nullable: false })
  ciudadano: Ciudadano;
  @Column({ type: 'int', nullable: false })
  ciudadanoId: number;

  baneado: boolean;
  motivoBaneo: string;

  @ManyToOne(() => Ciudadano, { nullable: true })
  ciudadanoBanea: Ciudadano;
  @Column({ type: 'int', nullable: true })
  ciudadanoBaneaId: number;

  @Column({ type: 'datetime', nullable: true })
  fechaBaneo: Date;
}
