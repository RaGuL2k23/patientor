import patientsEntries from '../../data/patients';
import {  EntryWithoutId, NewPatientEntry, NonSensitivePatientsEntry, PatientsEntry } from '../types';

import {v1 as uuid} from 'uuid';

const getInfo = ():NonSensitivePatientsEntry[] =>   {
  return patientsEntries.map(({id,name,dateOfBirth,gender,occupation,entries})=>({
    id,name,dateOfBirth,gender,occupation,entries
  }));
} ;
const getPatientById = (id:string):PatientsEntry =>{
  // if(!Array.isArray(patientsEntries) || patientsEntries==undefined) return '';
  const patient = patientsEntries.find(e=>e.id===id);
  if(!patient) throw new Error('patient not found ');
  return patient;
};
const addPatient = (entry:NewPatientEntry ):PatientsEntry=>{
  const newPatient = {
    id:uuid(),
    ...entry
  };
  patientsEntries.push(newPatient);
  return newPatient ;
};
const addPatientEntry = (entry:EntryWithoutId,patient:PatientsEntry):PatientsEntry=>{
   const newEntry = {id:uuid(),...entry};
  patient.entries.unshift(newEntry);
  return patient;  
};
export default({
    getInfo,
    addPatient,
    getPatientById,
    addPatientEntry
});