import express from "express";
import { rateLimit } from "express-rate-limit";
import { register, signIn, updateCompanyProfile } from "../controllers/companiesController.js";
import userAuth from "../middlewares/authMiddleware.js";


//ip rate limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  const router=express.Router()
  router.post("/register",limiter,register)
  router.post("/signIn",signIn)

  router.put("/update-company", userAuth, updateCompanyProfile);

  export default router