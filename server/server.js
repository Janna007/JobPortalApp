import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import xss from 'xss-clean'
import mongosanitize from 'express-mongo-sanitize'
import connectDB from './db/dbconnection.js'


dotenv.config()

const app=express()

const PORT=process.env.PORT || 8000

connectDB();

//middlewares

app.use(cors());
app.use(xss());
app.use(mongosanitize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));


app.listen(PORT,()=>{
    console.log(`server is running on port number ${PORT}`)
})