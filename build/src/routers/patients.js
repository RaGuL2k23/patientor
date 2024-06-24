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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = __importStar(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.json(patientsService_1.default.getInfo());
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.json(patientsService_1.default.getPatientById(id));
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = (0, utils_1.default)(req.body);
        const newPatientAdded = patientsService_1.default.addPatient(newPatientEntry);
        res.json(newPatientAdded);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(404);
            res.send(e.message);
        }
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        const id = req.params.id;
        const requestedPatient = (patientsService_1.default.getPatientById(id));
        const entry = (0, utils_1.toNewEntryForPatient)(req.body);
        patientsService_1.default.addPatientEntry(entry, requestedPatient);
        res.json(requestedPatient);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(404);
            res.send(e.message);
        }
    }
});
exports.default = router;
