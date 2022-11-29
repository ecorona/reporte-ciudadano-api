import { Ciudadano } from '../ciudadanos/entities/ciudadano.entity';
import { CommonEntity } from '../common/common-entity.abstract';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity('syslog')
export class SyslogEntity extends CommonEntity {
  //el ciudadano en sesión.
  @ManyToOne(() => Ciudadano, { nullable: true })
  ciudadano?: Ciudadano;

  @Column({ type: 'int', nullable: true })
  ciudadanoId?: number;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  method: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  baseUrl: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  statusCode: number;

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  contentLength: number;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: false,
  })
  userAgent: string;

  @Column({
    type: 'varchar',
    length: 39,
    nullable: false,
  })
  ip: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  body: any;

  @Column({
    type: 'json',
    nullable: true,
  })
  params: any;

  @Column({
    type: 'json',
    nullable: true,
  })
  query: any;

  @Column({
    type: 'tinytext',
    nullable: true,
  })
  referrer: string;

  @Column({
    type: 'tinytext',
    nullable: true,
  })
  responseTime: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  responseData: any;

  @Column({
    type: 'varchar',
    length: '250',
    nullable: true,
  })
  eventName: string;
}
