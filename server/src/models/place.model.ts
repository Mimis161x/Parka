import {Schema, model} from 'mongoose';

const placeSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    address: {type: String, required: true},
    description: {type: String},
    price:{type: Number, required: true},
    isOpen: {type: Boolean, required: true, default: true}


}, {timestamps: true} );

export default model('Place', placeSchema);