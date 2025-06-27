import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ITask extends Document {
    name: string;
    priority: string;
    done: boolean;
    userId: Types.ObjectId;
}

const TaskSchema = new Schema<ITask>({
    name: { 
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 100
    },
    priority: { 
        type: String, 
        enum: ['baixa', 'media', 'alta'], 
        required: true 
    },
    done: { 
        type: Boolean, 
        default: false
    },
    userId: { 
        type: Schema.ObjectId, 
        ref: 'User', 
        required: true 
    },
}, { timestamps: true});

TaskSchema.set('toJSON', {
    transform: (_doc, ret) => {
        delete ret.v;
    }
});


export default mongoose.model<ITask>('Task', TaskSchema);