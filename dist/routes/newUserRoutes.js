import { Router } from "express";
import { resendOTP, signin, signup, verifyOTP } from "../controller/authController.js";
import { Profile } from "../controller/profileController.js";
const newUserRouter = Router();
newUserRouter.post("/signup", signup);
newUserRouter.post("/sendotp", verifyOTP);
newUserRouter.post("/resendotp", resendOTP);
newUserRouter.post("/signin", signin);
newUserRouter.post("/updateprofile", Profile);
export default newUserRouter;
//# sourceMappingURL=newUserRoutes.js.map