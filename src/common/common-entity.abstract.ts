import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
/**
 * Todas nuestros entities tienen estos campos, mejor se ponen aqui
 */
export abstract class CommonEntity {
  /**
   * Identificador del registro
   */
  @PrimaryGeneratedColumn()
  id?: number;

  /**
   * Identificador único del registro
   */
  @Column({
    name: 'uuid',
    unique: true,
  })
  @Generated('uuid')
  uuid?: string;

  /**
   * Fecha de creación del registro
   */
  @Index()
  @CreateDateColumn({ type: 'timestamp', name: 'createdAt' })
  createdAt?: Date;

  /**
   * Fecha de actualización del registro
   */
  @Index()
  @UpdateDateColumn({ type: 'timestamp', name: 'updatedAt' })
  updatedAt?: Date;

  /**
   * Fecha de eliminación del registro
   */
  @DeleteDateColumn()
  deletedAt?: Date;

  /**
   * Versión del registro
   */
  @VersionColumn()
  version?: number;
}
