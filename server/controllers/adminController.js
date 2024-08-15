


//get all users

import { Users } from "../models/userModel.js";

export const getUsers=async(req,res,next)=>{
    try {
        const users = await Users.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

}









