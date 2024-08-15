import express from 'express'

const router=express.Router()
import {getUsers} from '../controllers/adminController.js'
import authAdmin from '../middlewares/adminMiddleware.js'
import userAuth from '../middlewares/authMiddleware.js';

router.get("/getusers",userAuth,authAdmin, getUsers);

export default router