import { isValidObjectId } from "mongoose"
import { Companies } from "../models/companiesModel.js"


export const register=async(req,res,next)=>{
    const {name,email,password}=req.body

    if(!email || !name || !password){
        next("all fields are required")
        return
    }
    try {

      const existUser=  await Companies.findOne({email})
      if(existUser){
        next("user already exist with this email")
        return
      }

      const userCompany=await Companies.create({
            email,
            name,
            password
      })

      if(!userCompany){
        next("something went wrong while creating account")
        return
      }
     const company=await Companies.findById(userCompany?._id).select("-password")
      const token= await company.createToken()

      res.status(200)
       .send({
        success:true,
        messege:"Account created for company succesfully",
        company,
        token
      })        
    } catch (error) {
         console.log(error)
         res.status(404).json({messege:error.messege})
    }
}

export const signIn=async(req,res,next)=>{
    const{email,password}=req.body

    if(!email || !password){
        next("all fields are required")
        return
    }
   try {
      const existCompany=await Companies.findOne({email})
      if(!existCompany){
        next("No user exist !!!")
        return
      }

    const correctPassword= await existCompany.isPasswordCorrect(password)

    if(!correctPassword){
        next("wrong password!try again")
        return
    }

    const company=await Companies.findById(existCompany._id).select("-password")

    const token =await company.createToken()

    res.status(200).send({
        success:true,
        messege:"loggined succesfully",
        company,
        token
    })

        
    } catch (error) {
        console.log(error)
        res.status(200).json({messege:messege.error})
    }
}

export const updateCompanyProfile=async(req,res,next)=>{
    const { name, contact, location, profileUrl, about } = req.body;
    if (!name || !location || !about || !contact  ) {
        next("Please Provide All Required Fields");
        return;
      }
      try {
       const id=req.body.user.userId
       console.log(id)
       if(!isValidObjectId(id)){
        next("unauthorized access")
        return
       }

       const updateCompany=await Companies.findByIdAndUpdate(id,
        {
            $set:{
                name,
                contact,
                about,
                location,
            }
        },
        {new:true})

        if(!updateCompany){
            next("can't update the profile")
            return
        }

        const company=await Companies.findById(updateCompany?._id).select("-password")
        const token=await company.createToken()

        res.status(200).send({
            success:true,
            messege:"Update company profule succesffully",
            company,
            token
        })

        
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
      }
}

export const getCompanyProfile =async(req,res,next)=>{
       const id=req.body.user.userId
}