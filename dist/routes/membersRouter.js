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
const MemberRepository_1 = require("../repositories/MemberRepository");
const member_schema_1 = require("./member-schema");
const z = __importStar(require("zod"));
const router = (0, express_1.Router)();
router.post('/members', async (req, res) => {
    try {
        const parsedMember = member_schema_1.memberSchema.parse(req.body);
        const savedMember = await MemberRepository_1.MemberRepository.createAndSave(parsedMember);
        res.status(201).json(savedMember);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                message: 'Invalid data types',
                errors: error.issues
            });
        }
        else
            res.status(500).json({ message: 'Error adding member.' });
    }
});
router.get('/members', async (req, res) => {
    try {
        const members = await MemberRepository_1.MemberRepository.findAll();
        res.json(members);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching members.' });
    }
});
router.get('/members/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const member = await MemberRepository_1.MemberRepository.findById(id);
        if (!member) {
            return res.status(204).json();
        }
        res.json(member);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching member.' });
    }
});
router.put('/members/:id', async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    if (!MemberRepository_1.MemberRepository.findById(id))
        res.status(204);
    try {
        await MemberRepository_1.MemberRepository.update(id, updateData);
        res.json({ message: 'Member updated sucessfully' });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                message: 'Invalid data types',
                errors: error.issues
            });
        }
        else
            res.status(500).json({ message: 'Error updating member.' });
    }
});
router.delete('/members/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const member = MemberRepository_1.MemberRepository.findById(id);
        if (!member) {
            return res.status(204).json();
        }
        else {
            MemberRepository_1.MemberRepository.delete(id);
            res.json('Member sucessfully deleted');
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting member.' });
    }
});
exports.default = router;
