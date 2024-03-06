import mysql from 'mysql2/promise'; 
import dotenv from 'dotenv'

dotenv.config()

interface ConnectionConfig {
    host: string
    user: string
    password: string
    database: string
}

const createConnection = async (config: ConnectionConfig) => {
    const connection = await mysql.createConnection(config)
    await connection.connect()
    return connection;
}

const dbConfig: ConnectionConfig = {
    host: process.env.DB_HOST as string, 
    user: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string
};

const connection =  createConnection(dbConfig)
export default connection

