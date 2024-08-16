import express from 'express'

const router=express.Router()
import {deleteCompanies, deleteUser, getCompanies, getUsers} from '../controllers/adminController.js'
import authAdmin from '../middlewares/adminMiddleware.js'
import userAuth from '../middlewares/authMiddleware.js';

router.get("/getusers",userAuth,authAdmin, getUsers);
router.delete("/deleteuser/:id",userAuth,authAdmin,deleteUser)
router.delete("/deletecompany/:id",userAuth,authAdmin,deleteCompanies)
router.get("/getcompanies",userAuth,authAdmin, getCompanies);

export default router