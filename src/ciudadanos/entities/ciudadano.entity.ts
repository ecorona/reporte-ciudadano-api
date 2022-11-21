import { Rol } from './../../auth/roles/rol.enum';
import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../common/common-entity.abstract';

/**
 * Entidad para los ciudadanos
 */
@Entity('ciudadanos')
export class Ciudadano extends CommonEntity {
  /**
   * Nombre del ciudadano
   */
  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  nombres: string;

  /**
   * Apellido del ciudadano
   */
  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  apellidos: string;

  /**
   * Apodo electrónico del ciudadano
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  alias: string;

  /**
   * Teléfono del ciudadano
   */
  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  telefono: string;

  /**
   * Prefijo telefonico del ciudadano
   */
  @Column({
    type: 'varchar',
    length: 5,
    nullable: true,
  })
  prefijoTelefono: string;

  /**
   * Correo electrónico del ciudadano
   */
  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
    unique: true,
  })
  email: string;

  /**
   * Contraseña del ciudadano
   */
  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  @Exclude()
  password: string;

  /**
   * Roles del ciudadano
   */
  @Column({
    type: 'simple-array',
  })
  roles: Rol[];
}
