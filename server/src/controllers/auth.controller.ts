import { Request, Response } from 'express';
import { AuthService, SignupSchema, LoginSchema } from '../services/auth.service';

const authService = new AuthService();

/**
 * @swagger
 * tags:
 * name: Auth
 * description: Διαχείριση χρηστών
 */

/**
 * @swagger
 * /api/auth/register:
 * post:
 * summary: Εγγραφή νέου χρήστη
 * tags: [Auth]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * username: { type: string }
 * email: { type: string }
 * password: { type: string }
 * role: { type: string, enum: [client, owner] }
 * responses:
 * 201:
 * description: Επιτυχής εγγραφή
 * 400:
 * description: Σφάλμα
 */
export const register = async (req: Request, res: Response) => {
    try {
        const validatedData = SignupSchema.parse(req.body);
        const result = await authService.register(validatedData);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * @swagger
 * /api/auth/login:
 * post:
 * summary: Σύνδεση χρήστη
 * tags: [Auth]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * email: { type: string }
 * password: { type: string }
 * responses:
 * 200:
 * description: Επιτυχής σύνδεση
 * 401:
 * description: Λάθος credentials
 */
export const login = async (req: Request, res: Response) => {
    try {
        const validatedData = LoginSchema.parse(req.body);
        const result = await authService.login(validatedData);
        res.json(result);
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
};