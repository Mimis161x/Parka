import placeModel from '../models/park.model';
import { z } from 'zod';
import BookingModel from "../models/booking.model";

export const CreateParkSchema = z.object({
    address: z.string().min(5),
    description: z.string().optional(),
    price: z.number().min(0.5),
});

export class SpotService {
    async createSpot(data: z.infer<typeof CreateParkSchema>, ownerId: string) {
        const spot = await placeModel.create({
            ...data,
            owner: ownerId,
            isOpen: true
        } as any);
        return spot;
    }

    async getAllSpots() {
        const now = new Date();


        const activeBookings = await BookingModel.find({
            startTimestamp: { $lte: now }, // Ξεκίνησε πριν από τώρα
            endTimestamp: { $gte: now },   // Τελειώνει μετά από τώρα
            status: 'active'
        });


        const occupiedSpotIds = activeBookings.map((b: any) => b.place);


        return placeModel.find({
            _id: { $nin: occupiedSpotIds }, // $nin = Not In
            isOpen: true
        }).populate('owner', 'username email');
    }

    async getSpotById(id: string) {
        return placeModel.findById(id);
    }
}