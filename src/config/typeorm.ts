import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenvConfig({ path: './.development.env' });

const config = {
  type: 'postgres', //configService.get('DB_TYPE'),
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  autoLoadEntities: true, // Los archivos que contienen las entidades se inicien de forma automatica
  synchronize: true, // Esto creará las tablas si no existen en la base de datos
  logging: true,
  dropSchema: false, //brorra toda las tablas de la base de datos
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.js,.ts}'],
  subscribers: ['dist/subscriber/**/*.js'],
};

// registro de objeto de configuracion
export default registerAs('typeorm', () => config);
// establecer la conexion de typeorm con la base de datos
export const connectionSource = new DataSource(config as DataSourceOptions);
