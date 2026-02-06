import {Schema, model, Document } from  'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: 'driver' | 'owner';
}

const UserSchema = new Schema({
    username: {type : String, required: true, unique: true},
    email: {type : String, required: true, unique: true},
    password: {type : String, required: true},
    role: {type : String, enum: ['driver', 'owner'], default: 'driver'}
    }, {timestamps: true}
);

UserSchema.plugin(uniqueValidator);
export default model<IUser>('User', UserSchema);