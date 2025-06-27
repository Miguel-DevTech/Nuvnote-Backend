import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
}

const UserSchema = new Schema<IUser>({
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email address']
    },
    password: { 
        type: String, 
        required: true 
    }
}, { timestamps: true });

UserSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export default mongoose.model<IUser>('User', UserSchema);