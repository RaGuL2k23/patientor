import {     EntryWithoutId, Gender,  HealthCheckRating,  NewPatientEntry, OccupationalHealthcareEntry } from "./types";

const toNewPatientEntry = (object:unknown):NewPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }
      
    if("ssn" in object && "name" in object && "occupation" in object && "dateOfBirth" in object && "gender" in object ){
        const newEntry =  {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            ssn:parseSsn(object.ssn),
            entries:[] 
        };
        return newEntry;
    }
  throw new Error('Incorrect data: some fields are missing');

};
export const toNewEntryForPatient = (object:unknown):EntryWithoutId=>{
    console.log(object);
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data (no data)');
      } 
    if(!("type" in object) || !object.type || typeof( object.type)!=="string" ){
        throw new Error('Incorrect or missing "type" property');
      }
      if( !("date" in object && "description" in object &&   "specialist" in object)){
        throw new Error('Incorrect or missing entry fields date,descrption,specialist  ');

      }
    
      const type = object.type;
      if (type === 'Hospital') {
        if (!('date' in object && 'description' in object && 'specialist' in object && 'discharge' in object)) {
          throw new Error('Incorrect or missing fields for Hospital entry');
        }
    
        const discharge = object.discharge as { date: unknown; criteria: unknown };
        return {
          date: parseDateOfBirth(object.date),
          type: 'Hospital',
          specialist: parseName(object.specialist ),
          description: parseName(object.description ),
          discharge: {
            date: parseDateOfBirth(discharge.date),
            criteria: parseName(discharge.criteria),
          },
        };
      } else if (type === 'HealthCheck') {
        if (!('date' in object && 'description' in object && 'specialist' in object && 'healthCheckRating' in object)) {
          throw new Error('Incorrect or missing fields for HealthCheck entry');
        }
    
        return {
          date: parseDateOfBirth(object.date),
          type: 'HealthCheck',
          specialist: parseName(object.specialist),
          description: parseName(object.description),
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
      } else if (type === 'OccupationalHealthcare') {
        if (!('date' in object && 'description' in object && 'specialist' in object && 'employerName' in object)) {
          throw new Error('Incorrect or missing fields for OccupationalHealthcare entry');
        }
    
        const entry: Omit<OccupationalHealthcareEntry,'id'> = {
          date: parseDateOfBirth(object.date),
          type: 'OccupationalHealthcare',
          specialist: parseName(object.specialist),
          description: parseName(object.description),
          employerName: parseName(object.employerName),
        };
    
        if ('sickLeave' in object && object.sickLeave) {
          const sickLeave = object.sickLeave as { startDate: unknown; endDate: unknown };
          entry.sickLeave = {
            startDate: parseDateOfBirth(sickLeave.startDate),
            endDate: parseDateOfBirth(sickLeave.endDate),
          };
        }
    
        return entry;
      }
     throw new Error('Not a valid type');
 
};
 
const parseHealthCheckRating = (number:unknown):number =>{
    if(typeof(number)==="number" && isHealthCheckRating(number) ){
      return number;
    }
    throw new Error("HealthCheckRating is not valid possible values (0,1,2,3)")
}
const isHealthCheckRating = (number:number):boolean =>{
  return Object.values(HealthCheckRating).map(e=>e.toString()).includes(number.toString());
};
const parseSsn = (param:unknown) :string =>{
    if(!param || !isString(param)) {
        throw new Error("ssn field is missing or incorrect "+param);
    }
    return param  ;
};

const parseGender = (param:unknown) : Gender => {
     
    if(!param || !isString(param) || !isGender(param)){
        throw new Error("gender field is missing or incorrect "+param);
    }
     return param  ;
};
 
const isGender = (gender:string):gender is Gender => {
    return Object.values(Gender).map(e=>e.toString()).includes(gender);
};
 
const parseOccupation = (param:unknown):string => {
    if(!param || !isString(param)   ){
        throw new Error("date field is missing or incorrect ");
    }
    return param;
};
const parseDateOfBirth = (param:unknown):string => {
    if(!param || !isString(param) || !isDate(param)){
        throw new Error("date field is missing or incorrect ");
    }
    return param;
};
const parseName = (text:unknown):string =>{
    if(!text || !isString(text)) {
        throw new Error("name field is missing or incorrect ");
    }
    return text;
};
const isDate  = (date:string):boolean => {
    return Boolean(Date.parse(date));
};
const isString = (text:unknown) : text is string =>{
    return typeof text === 'string' || text instanceof String;
};

export default toNewPatientEntry;