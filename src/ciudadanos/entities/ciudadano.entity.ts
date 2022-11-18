import { Rol } from './../../auth/roles/rol.enum';
import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../common/common-entity.abstract';

@Entity('ciudadanos')
export class Ciudadano extends CommonEntity {
  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  nombres: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  apellidos: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  alias: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  telefono: string;

  @Column({
    type: 'varchar',
    length: 5,
    nullable: true,
  })
  prefijoTelefono: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  @Exclude()
  password: string;

  @Column({
    type: 'simple-array',
  })
  roles: Rol[];
}
