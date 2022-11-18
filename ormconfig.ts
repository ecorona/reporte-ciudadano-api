import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import * as dotenv from 'dotenv';
dotenv.config();

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['dist/src/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/src/db/migrations/*.js'],
};

export default config;
