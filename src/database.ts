import mysql from 'mysql2/promise'; 

interface ConnectionConfig {
    host: string;
    user: string;
    password: string;
    database: string;
}

const createConnection = async (config: ConnectionConfig) => {
    const connection = await mysql.createConnection(config);
    await connection.connect();
    console.log('Database connected!');
    return connection;
}

const dbConfig: ConnectionConfig = {
    host: '127.0.0.1', 
    user: 'root',
    password: 'samojako',
    database: 'test'
};

const connection =  createConnection(dbConfig);
export default connection; 
