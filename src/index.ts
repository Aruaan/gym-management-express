import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import membersRouter from './routes/membersRouter';
import connection from './database'; 
import bodyParser = require('body-parser');
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); 

const startServer = async () => {
    await connection;
    app.use('/api', membersRouter);

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
};

startServer(); 
