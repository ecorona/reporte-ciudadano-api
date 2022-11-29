import { SyslogRepository } from './syslog.repository';
import { Injectable } from '@nestjs/common';
import { forIn } from 'lodash';
import { SyslogEntity } from './syslog.entity';

@Injectable()
export class SyslogService {
  constructor(private readonly syslogRepository: SyslogRepository) {}
  async storeLog(data: Partial<SyslogEntity>): Promise<SyslogEntity> {
    return this.syslogRepository.save(data);
  }

  async paginate(options: any): Promise<any> {
    const dataQuery = this.syslogRepository
      .createQueryBuilder('syslog')
      .leftJoin('syslog.ciudadano', 'ciudadano')
      .select([
        'syslog.id',
        'syslog.createdAt',
        'syslog.method',
        'syslog.baseUrl',
        'syslog.statusCode',
        'syslog.contentLength',
        'syslog.responseTime',
        'syslog.ip',
        'syslog.event',
        'syslog.params',
        'syslog.query',
        'ciudadano.id',
        'ciudadano.firstName',
        'ciudadano.lastName',
        'ciudadano.email',
      ]);

    forIn(options.filters, (value, key) => {
      if (key === 'term') {
        dataQuery.orWhere('( syslog.method LIKE :term )', {
          term: `%${value.split(' ').join('%')}%`,
        });

        dataQuery.orWhere('( syslog.baseUrl LIKE :term )', {
          term: `%${value.split(' ').join('%')}%`,
        });

        dataQuery.orWhere('( ciudadano.email LIKE :term )', {
          term: `%${value.split(' ').join('%')}%`,
        });

        dataQuery.orWhere('( ciudadano.firstName LIKE :term )', {
          term: `%${value.split(' ').join('%')}%`,
        });

        dataQuery.orWhere('( ciudadano.lastName LIKE :term )', {
          term: `%${value.split(' ').join('%')}%`,
        });

        dataQuery.orWhere('( ip = :term )', {
          term: `%${value}%`,
        });

        dataQuery.orWhere('( statusCode = :term )', {
          term: `%${value}%`,
        });
      }
    });

    const count = await dataQuery.getCount();

    if (options.sort === undefined) {
      options.sort = 'syslog.id';
    }

    let direction: 'ASC' | 'DESC' = 'ASC';

    if (options.direction) {
      direction = options.direction;
    }

    const data = await dataQuery
      .skip(options.skip)
      .take(options.take)
      .orderBy(options.sort, direction)
      .getMany();

    return {
      data: data,
      skip: options.skip,
      totalItems: count,
    };
  }

  getById(id: number): Promise<SyslogEntity> {
    return this.syslogRepository
      .createQueryBuilder('syslog')
      .leftJoin('syslog.ciudadano', 'ciudadano')
      .select([
        'syslog.id',
        'syslog.ciudadano',
        'syslog.method',
        'syslog.baseUrl',
        'syslog.statusCode',
        'syslog.contentLength',
        'syslog.userAgent',
        'syslog.ip',
        'syslog.body',
        'syslog.referrer',
        'syslog.event',
        'syslog.params',
        'syslog.query',
        'syslog.responseTime',
        'ciudadano.id',
        'ciudadano.firstName',
        'ciudadano.lastName',
        'ciudadano.email',
      ])
      .where('syslog.id = :elId', { elId: id })
      .getOne();
  }
}
