
import express from 'express'
import authRoute from "./authRoutes.js";
import userRoute from "./userRoutes.js"
import  companyRoute from "./companiesRoutes.js"
import jobsRoute from './jobsRoutes.js'
import adminRoute from './adminRoutes.js'
const router = express.Router();

const path = "/api-v1/";

router.use(`${path}auth`, authRoute); 
router.use(`${path}users`,userRoute)
router.use(`${path}companies`,companyRoute)
router.use(`${path}jobs`,jobsRoute)
router.use(`${path}admin`,adminRoute)

export default router 
