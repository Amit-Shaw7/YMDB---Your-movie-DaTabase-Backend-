import express from 'express';
import dotenv from 'dotenv';
import { connectToDataBase } from './db.js';
import AuthRouter from './routers/AuthRouter.js';
import MovieRouter from './routers/MovieRouter.js';
import cors from 'cors';

const app = express();
dotenv.config();
app.use(cors({origin:"http://localhost:3000" , credentials:true}))

const MongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT;

app.use(express.json());
app.listen(PORT, async () => {
    await connectToDataBase(MongoURI);
    console.log("Listening at port : ", PORT);
});

// Routes
app.use('/api/auths' , AuthRouter);
app.use('/api/movies' , MovieRouter);


