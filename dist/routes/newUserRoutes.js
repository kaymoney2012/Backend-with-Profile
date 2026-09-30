import { Router } from "express";
import { resendOTP, signin, signup, updateProfile, verifyOTP } from "../controller/newUserController.js";
import { protect } from "../middleware/protect.js";
const newUserRouter = Router();
newUserRouter.post("/signup", signup);
newUserRouter.post("/sendotp", verifyOTP);
newUserRouter.post("/resendotp", resendOTP);
newUserRouter.post("/signin", signin);
newUserRouter.patch("/updateprofile", protect, updateProfile);
export default newUserRouter;
//# sourceMappingURL=newUserRoutes.js.map