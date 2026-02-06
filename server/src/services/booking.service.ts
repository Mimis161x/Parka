import BookingModel from '../models/booking.model';
import  PlaceModel from '../models/park.model';
import { z } from 'zod';

export const CreateBookingSchema = z.object({
    spotId: z.string(),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
});

export class BookingService {
    async createBooking(data: z.infer<typeof CreateBookingSchema>, driverId: string) {
        const spot = await PlaceModel.findById(data.spotId);
        if (!spot) throw new Error("Η θέση δεν βρέθηκε");

        const start = new Date(data.startTime);
        const end = new Date(data.endTime);

        if (start >= end) throw new Error("Η ώρα λήξης πρέπει να είναι μετά την έναρξη");

        const pricePerUnit = (spot as any).price;
        const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        const totalPrice = hours * pricePerUnit;

        const booking = await BookingModel.create({
            user: driverId,
            place: data.spotId,
            startTimestamp: start,
            endTimestamp: end,
            totalPrice: totalPrice.toFixed(2),
            status: 'active'
        } as any);

        return booking;
    }

    async getUserBookings(userId: string) {
        return BookingModel.find({user: userId} as any)
            .populate('place', 'address pricePerHour')
            .sort({createdAt: -1});
    }
}