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
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    name: 'uuid',
    unique: true,
  })
  @Generated('uuid')
  uuid?: string;

  @Index()
  @CreateDateColumn({ type: 'timestamp', name: 'createdAt' })
  createdAt?: Date;

  @Index()
  @UpdateDateColumn({ type: 'timestamp', name: 'updatedAt' })
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @VersionColumn()
  version?: number;
}
