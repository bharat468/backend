import { Router } from "express";
import { blockUnblockUser, getUsersByRole, loginAdmin, logoutAdmin, updateAdmin } from "../controllers/adminController.js";

const adminRouter = Router();
adminRouter.post("/login", loginAdmin)
adminRouter.post("/logout", logoutAdmin)
adminRouter.put("/:id", updateAdmin)
adminRouter.get('/users', getUsersByRole)
adminRouter.put('/user/block/:id', blockUnblockUser)

export default adminRouter;