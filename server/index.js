import express from 'express';
import dotenv from 'dotenv';
import { dbConnection } from './db/db.js';
import router from './routes/router.js';
import cors from 'cors';

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors())
dbConnection();
app.use(router)
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server up on http://localhost:${PORT}`)
})
6