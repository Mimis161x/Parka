import placeModel from '../models/place.model';
import { z } from 'zod';

export const CreateSpotSchema = z.object({
    address: z.string().min(5),
    description: z.string().optional(),
    pricePerHour: z.number().min(0.5),
});

export class SpotService {
    async createSpot(data: z.infer<typeof CreateSpotSchema>, ownerId: string) {
        const spot = await placeModel.create({
            ...data,
            owner: ownerId,
            isOpen: true
        } as any);
        return spot;
    }

    async getAllSpots() {
        return placeModel.find({isOpen: true} as any).populate('owner', 'username email');
    }

    async getSpotById(id: string) {
        return placeModel.findById(id);
    }
}