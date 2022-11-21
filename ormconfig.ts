import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

config();

/**
 * Configuración de la base de datos
 */
const OptionsTYPEORM: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.js'],
  migrationsTableName: 'migrations',
};

/**
 * Data source para la base de datos
 */
export default new DataSource(OptionsTYPEORM);
