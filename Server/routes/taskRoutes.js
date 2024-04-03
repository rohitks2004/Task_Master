import express from "express";
import {isAdminRoute,protectRoute} from "../middlewares/authMiddleware.js"
import { createTask, dashboardStatistics, duplicateTask, postTaskActivity } from "../controllers/taskControllers.js";
const router=express.Router();

router.post("/create",protectRoute,isAdminRoute,createTask);
router.post("/duplicate/:id",protectRoute,isAdminRoute,duplicateTask);
router.post("/activity/:id",protectRoute,isAdminRoute,postTaskActivity);


router.get(" /dashboard" ,protectRoute, dashboardStatistics);
// router.get( " /",protectRoute, getTasks);
// router.get(":/id",protectRoute, getTask);

export default router;