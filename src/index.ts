import express, { Express } from 'express';
import dotenv from 'dotenv';
import membersRouter from './routes/membersRouter';
import workoutsRouter from './routes/workoutsRouter'
import exercisesRouter from './routes/exercisesRouter'
import equipmentRouter from './routes/equipmentRouter'
import dataSource from './app-data-source';
import 'reflect-metadata';

dotenv.config(); 

const app: Express = express();
const port = process.env.PORT;

app.use(express.json()); 

const startServer = async () => {
    try {
        await dataSource.initialize();
        app.use('/api', membersRouter, workoutsRouter, exercisesRouter, equipmentRouter);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`); 
        });
    } catch (error) {
        console.error("Error initializing data source:", error);
    }
};

startServer();
