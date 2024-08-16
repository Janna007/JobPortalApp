


//get all users

import { Companies } from "../models/companiesModel.js";
import { Users } from "../models/userModel.js";

export const getUsers = async (req, res, next) => {
    try {
      const users = await Users.find().select('-password');
      const totalUsers = await Users.countDocuments();
  
      res.json({
        totalUsers,
        users,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };

  //delete user


  export const deleteUser=async (req,res,next)=>{
      try {
        console.log(req)
        const userId = req.params.id;

        // Check if the user exists
        const user = await Users.findById(userId);
        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }

         // Delete the user
    await Users.findByIdAndDelete(userId);

    res.status(200).json({ msg: 'User deleted successfully' });
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }
  }

  //get all companies

  export const getCompanies = async (req, res, next) => {
    try {
      const companies = await Companies.find().select('-password');
      const totalCompanies = await Companies.countDocuments();
  
      res.json({
        companies,
        totalCompanies,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };




  //delete companies

  export const deleteCompanies=async(req,res,next)=>{
     try {
       const companyId=req.paramas.id
       console.log(companyId)
 
       const company=await Companies.findById(companyId)
 
       if(!company){
         return res.status(404).json({ msg: 'User not found' });
       }

       await Companies.findByIdAndDelete(companyId)
       res.status(200).json({ msg: 'User deleted successfully' });
   }
      catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
     }


    }









