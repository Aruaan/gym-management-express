"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const z = __importStar(require("zod"));
const WorkoutRepository_1 = require("../repositories/WorkoutRepository");
const workout_schema_1 = require("./workout-schema");
const router = (0, express_1.Router)();
router.post('/workouts', async (req, res) => {
    try {
        const parsedWorkout = workout_schema_1.workoutSchema.parse(req.body);
        const savedWorkout = await WorkoutRepository_1.WorkoutRepository.createAndSave(parsedWorkout);
        res.status(201).json(savedWorkout);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                message: 'Invalid data types',
                errors: error.issues
            });
        }
        else
            res.status(500).json({ message: 'Error adding workout.' });
    }
});
router.get('/workouts', async (req, res) => {
    try {
        const workouts = await WorkoutRepository_1.WorkoutRepository.findAll();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching workouts.' });
    }
});
router.get('/workouts', async (req, res) => {
    const memberId = req.query.member_id;
    if (!memberId) {
        return res.status(400).json({ message: 'Missing member_id query.' });
    }
    try {
        const workouts = await WorkoutRepository_1.WorkoutRepository.find({
            where: { member: { id: String(memberId) } }
        });
        res.json({ message: "The member has logged these workouts:", workouts });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching this member's workouts." });
    }
});
exports.default = router;
