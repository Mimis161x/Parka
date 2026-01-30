import {Schema, model} from 'mongoose';

const bookingSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    place: {type: Schema.Types.ObjectId, ref: 'Place', required: true},
    startTimestamp: {type: Date, required: true},
    endTimestamp: {type: Date, required: true},
    totalPrice: {type: Number, required: true},
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    }
}, {timestamps: true})

export default model('Booking', bookingSchema);