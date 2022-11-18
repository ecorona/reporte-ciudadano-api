import { CommonEntity } from '../../common/common-entity.abstract';
import { Colonia } from './../../colonias/entities/colonia.entity';
import { Calle } from './../../calles/entities/calle.entity';
import { Ciudadano } from '../../ciudadanos/entities/ciudadano.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { OrigenesComunicados } from '../enum/origenes-comunicados.enum';
import { Regiduria } from '../../regidurias/entities/regiduria.entity';

@Entity('comunicados')
export class Comunicado extends CommonEntity {
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  titulo: string;

  @Column({
    type: 'text',
  })
  descripcion: string;

  @Column({
    type: 'datetime',
    nullable: false,
  })
  fecha: Date;

  @ManyToOne(() => Ciudadano, { nullable: false })
  ciudadano: Ciudadano;

  @Column({
    type: 'int',
    nullable: false,
  })
  ciudadanoId: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  origenComunicado: OrigenesComunicados; // MUNICIPIO | CALLE | COLONIA

  // Regiduria de origen del comunicado (si es de origen MUNICIPIO)
  @ManyToOne(() => Regiduria, { nullable: true })
  regiduriaOrigen: Regiduria;

  // Calle de origen del comunicado cuando es de origenComunicado = 'CALLE'
  @ManyToOne(() => Calle, { nullable: true })
  calleOrigen: Calle;

  // Colonia de origen del comunicado cuando es de origenComunicado = 'COLONIA'
  @ManyToOne(() => Colonia, { nullable: true })
  coloniaOrigen: Colonia;

  //fecha hasta la cual estará visible para todos los ciudadanos
  @Column({
    type: 'date',
    nullable: false,
  })
  fechaVigencia: boolean;
}
