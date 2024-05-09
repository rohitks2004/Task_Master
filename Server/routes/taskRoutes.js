import express from "express";
import {isAdminRoute,protectRoute} from "../middlewares/authMiddleware.js"
import { createSubTask, createTask, dashboardStatistics, deleteRestoreTask, duplicateTask, getTask, getTasks, postTaskActivity, trashTask, updateTask } from "../controllers/taskControllers.js";
const router=express.Router();

router.post("/create",protectRoute,isAdminRoute,createTask);
router.post("/duplicate/:id",protectRoute,isAdminRoute,duplicateTask);
router.post("/activity/:id",protectRoute,isAdminRoute,postTaskActivity);

router.get("/:id",protectRoute, getTask);
router.get("/dashboard" ,protectRoute, dashboardStatistics);
router.get( "/fetch",protectRoute, getTasks);


router.put("/create-subtask/:id",protectRoute,isAdminRoute,createSubTask);
router.put("/update/:id",protectRoute,isAdminRoute,updateTask);
router.put("/:id",protectRoute,isAdminRoute,trashTask);


router.delete("/delete-restore/:id?",protectRoute,isAdminRoute,deleteRestoreTask);



export default router;