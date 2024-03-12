"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const membersRouter_1 = __importDefault(require("./routes/membersRouter"));
const workoutsRouter_1 = __importDefault(require("./routes/workoutsRouter"));
const app_data_source_1 = __importDefault(require("./app-data-source"));
require("reflect-metadata");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
const startServer = async () => {
    try {
        await app_data_source_1.default.initialize();
        app.use('/api', membersRouter_1.default, workoutsRouter_1.default);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    }
    catch (error) {
        console.error("Error initializing data source:", error);
    }
};
startServer();
