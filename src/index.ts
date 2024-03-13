import express, { Express } from 'express';
import dotenv from 'dotenv';
import membersRouter from './routes/membersRouter';
import workoutsRouter from './routes/workoutsRouter'
import exercisesRouter from './routes/exercisesRouter'
import equipmentRouter from './routes/equipmentRouter'
import mealsRouter from './routes/mealsRouter'
import measurementsRouter from './routes/measurementsRouter'
import dataSource from './app-data-source';
import 'reflect-metadata';

dotenv.config(); 

const app: Express = express();
const port = process.env.PORT;

app.use(express.json()); 

const startServer = async () => {
    try {
        await dataSource.initialize();
        app.use('/api', membersRouter, workoutsRouter, exercisesRouter, equipmentRouter, mealsRouter, measurementsRouter);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`); 
        });
    } catch (error) {
        console.error("Error initializing data source:", error);
    }
};

startServer();
