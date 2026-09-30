import { Router } from "express";
import { resendOTP, signin, signup, verifyOTP } from "../controller/authController.js";
import { updateProfile } from "../controller/profileController.js";
import { protect } from "../middleware/protect.js";



const newUserRouter = Router();

newUserRouter.post("/signup", signup);
newUserRouter.post("/sendotp", verifyOTP);
newUserRouter.post("/resendotp", resendOTP);
newUserRouter.post("/signin", signin );
newUserRouter.patch("/updateprofile", protect, updateProfile);

export default newUserRouter;