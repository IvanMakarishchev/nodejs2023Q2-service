import { join } from 'path';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config({ path: join(__dirname, '/../../../.env') });

export const dataSourceOptions = (): DataSourceOptions => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
      join(__dirname, '../post/**/entities/*.entity{.ts,.js}'),
      join(__dirname, '../post/favorites/**/entities/*.entity{.ts,.js}'),
    ],
    migrations: [join(__dirname, './migrations/*{.ts,.js}')],
    migrationsTableName: 'migrations',
    synchronize: false,
  };
};

const dataSource: DataSource = new DataSource(dataSourceOptions());

export default dataSource;
