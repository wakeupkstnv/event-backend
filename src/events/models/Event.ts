import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
    name: string;
    description: string;
    date: string;
    location: string;
    duration: string;
}

const EventSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    date: { type: String, default: Date.now },
    location: { type: String, required: true },
    duration: { type: String, required: true }
});

const Event = mongoose.model<IEvent>('Event', EventSchema);

export default Event;