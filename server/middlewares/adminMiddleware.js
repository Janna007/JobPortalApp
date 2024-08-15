//middleware to ckeck the user is admin or not

import { Users } from "../models/userModel.js"



 const authAdmin=async(req,res,next)=>{
    const userId=req.body.user.userId
    const user=await Users.findById(userId)
    if (!user.admin) return res.status(403).json({ message: 'Access denied. Not an admin.' });
    next();
}

export default authAdmin