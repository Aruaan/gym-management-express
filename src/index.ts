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

    app.get('/', (req: Request,res: Response)=>{
      res.send('Express + ts server')
    })

    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
};

startServer(); 
