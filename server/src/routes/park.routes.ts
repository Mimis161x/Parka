import { Router } from 'express';
import {createSpot, getAllSpots} from "../controllers/park.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();
router.get('/', getAllSpots);
router.post('/', authMiddleware, createSpot);

export default router;