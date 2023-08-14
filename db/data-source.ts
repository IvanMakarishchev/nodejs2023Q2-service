import { join } from 'path';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config({ path: join(__dirname, '/../../.env') });

export const dataSourseOptions = (): DataSourceOptions => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: [
      join(__dirname, '../src/post/**/entities/*.entity{.ts,.js}'),
      join(__dirname, '../src/post/favorites/**/entities/*.entity{.ts,.js}'),
    ],
    migrationsRun: false,
    migrationsTableName: 'migrations',
    migrations: [join(__dirname, './db/migrations/*{.ts,.js}')],
  };
};

const dataSource: DataSource = new DataSource(dataSourseOptions());

export default dataSource;
