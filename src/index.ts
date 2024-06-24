import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routers/diagnoses';
import patientsRouter from './routers/patients';

const app = express();
app.use(express.json());
app.use(express.static('dist'));
app.use(cors());
app.use('/api/diagnoses',diagnosesRouter);
app.use('/api/patients',patientsRouter);
app.get('/api/ping',(_req,res)=>{
    // let some = req;
    res.status(200);
    res.json('pong');
});

const PORT = 3001;
app.listen(PORT,()=>{
    console.log('app listening to port',PORT);
    
});