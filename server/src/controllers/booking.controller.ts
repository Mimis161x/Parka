import { Request, Response } from 'express';
import { BookingService, CreateBookingSchema } from '../services/booking.service';

const bookingService = new BookingService();

/**
 * @swagger
 * tags:
 * name: Bookings
 * description: Κρατήσεις
 */

/**
 * @swagger
 * /api/bookings:
 * post:
 * summary: Κράτηση θέσης
 * tags: [Bookings]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * spotId: { type: string }
 * startTime: { type: string }
 * endTime: { type: string }
 * responses:
 * 201:
 * description: Η κράτηση έγινε
 */
export const createBooking = async (req: Request, res: Response) => {
    try {
        const validatedData = CreateBookingSchema.parse(req.body);
        const userId = (req as any).user.id;
        const booking = await bookingService.createBooking(validatedData, userId);
        res.status(201).json(booking);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * @swagger
 * /api/bookings/my-bookings:
 * get:
 * summary: Οι κρατήσεις μου
 * tags: [Bookings]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Ιστορικό
 */
export const getMyBookings = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const bookings = await bookingService.getUserBookings(userId);
        res.json(bookings);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};