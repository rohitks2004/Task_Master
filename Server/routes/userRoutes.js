import express from "express";
import { isAdminRoute,protectRoute } from "../middlewares/authMiddleware.js";
import {  loginUser, registerUser,getTeamList,logoutUser,getNotificationsList,updateUserProfile,markNotificationRead,changeUserPassword, deleteUserProfile, activateUserProfile
} from "../controllers/userController.js";
const router=express.Router();                  
// Public routes
router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
// Protected routes
router.get("/get-team", protectRoute, isAdminRoute, getTeamList);
router.get("/notifications", protectRoute, getNotificationsList);

router.put("/profile", protectRoute, updateUserProfile);
router.put("/read-noti", protectRoute, markNotificationRead);
router.put("/change-password", protectRoute, changeUserPassword);
// FOR ADMIN ONLY - ADMIN ROUTES

router
.route("/:id")
.put(protectRoute, isAdminRoute, activateUserProfile)
.delete(protectRoute, isAdminRoute, deleteUserProfile);


export default router;