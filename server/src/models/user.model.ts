import {Schema, model } from  'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema = new Schema({
    username: {type : String, required: true, unique: true},
    email: {type : String, required: true, unique: true},
    password: {type : String, required: true},
    role: {type : String, enum: ['client', 'owner'], default: 'client'}
    }, {timestamps: true}
);

UserSchema.plugin(uniqueValidator);
export default model('User', UserSchema);