import { Router } from "express";
const router = Router();
import mocksController from "../controllers/mocks.controller.js";

//Route to get all pets:
router.get("/mockingpets", mocksController.getMockingPets);

//Route to get all users:
router.get("/mockingusers", mocksController.getMockingUsers);

// Route to generate data.
router.post("/generatedata", mocksController.generateData);

export default router;
