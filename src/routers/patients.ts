import  express  from "express";
import patientsService from "../services/patientsService";
import toNewPatientEntry, { toNewEntryForPatient } from "../utils";
const router = express.Router();

router.get('/',(_req,res)=>{
    res.json(patientsService.getInfo());
});
router.get('/:id',(req,res)=>{
    const id = req.params.id;    
    res.json(patientsService.getPatientById(id));
});
router.post('/',(req,res)=>{
    try{
    const newPatientEntry = toNewPatientEntry(req.body);
    const newPatientAdded = patientsService.addPatient(newPatientEntry);
    res.json(newPatientAdded);
    }catch(e){
        if(e instanceof Error ){
          res.status(404)  ;res.send(e.message);
     }
     }
    
});
router.post('/:id/entries',(req,res)=>{
    try{
        const id = req.params.id;
    const requestedPatient = (patientsService.getPatientById(id));
    const entry = toNewEntryForPatient(req.body);
    patientsService.addPatientEntry(entry,requestedPatient);
    res.json(requestedPatient);
    }catch(e){
       if(e instanceof Error ){
         res.status(404)  ;res.send(e.message);
    }
    }
    
});
export default router;