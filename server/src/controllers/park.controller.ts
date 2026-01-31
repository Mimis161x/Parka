import { Request, Response } from 'express';
import { SpotService, CreateParkSchema } from '../services/park.service';

const spotService = new SpotService();

/**
 * @swagger
 * tags:
 * name: Spots
 * description: Διαχείριση Θέσεων
 */

/**
 * @swagger
 * /api/spots:
 * post:
 * summary: Δημιουργία θέσης (Owners)
 * tags: [Spots]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * address: { type: string }
 * pricePerHour: { type: number }
 * description: { type: string }
 * responses:
 * 201:
 * description: Δημιουργήθηκε
 */
export const createSpot = async (req: Request, res: Response) => {
    try {
        const validatedData = CreateParkSchema.parse(req.body);
        const userId = (req as any).user.id;
        const spot = await spotService.createSpot(validatedData, userId);
        res.status(201).json(spot);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * @swagger
 * /api/spots:
 * get:
 * summary: Όλες οι θέσεις
 * tags: [Spots]
 * responses:
 * 200:
 * description: Λίστα θέσεων
 */
export const getAllSpots = async (req: Request, res: Response) => {
    try {
        const spots = await spotService.getAllSpots();
        res.json(spots);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};