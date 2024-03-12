import { DataSourceOptions, DataSource } from "typeorm"
import 'reflect-metadata'
import dotenv from 'dotenv'

dotenv.config()

export const dataSourceOptions: DataSourceOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/entities/**/*.entity{.ts,.js}"],
  synchronize: false,
  migrations: ["src/migrations/*{.ts,.js}"],
}
const dataSource = new DataSource(dataSourceOptions)
export default dataSource