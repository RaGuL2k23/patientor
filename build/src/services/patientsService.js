"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getInfo = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id, name, dateOfBirth, gender, occupation, entries
    }));
};
const getPatientById = (id) => {
    // if(!Array.isArray(patientsEntries) || patientsEntries==undefined) return '';
    const patient = patients_1.default.find(e => e.id === id);
    if (!patient)
        throw new Error('patient not found ');
    return patient;
};
const addPatient = (entry) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patients_1.default.push(newPatient);
    return newPatient;
};
const addPatientEntry = (entry, patient) => {
    const newEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patient.entries.unshift(newEntry);
    return patient;
};
exports.default = ({
    getInfo,
    addPatient,
    getPatientById,
    addPatientEntry
});
