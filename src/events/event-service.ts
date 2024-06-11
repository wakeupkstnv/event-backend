import mongoose from 'mongoose';
import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventModel, { IEvent } from './models/Event';

class EventService {

    async getEventById(id: any): Promise<IEvent | null> {
        return await EventModel.findById(id).exec();
    }

    async getEventsByCity(city: string): Promise<IEvent[] | null> {
        return await EventModel.find({ "location": city }).exec();
    }

    async getEvents(page: number, limit: number): Promise<IEvent[]> {
        return await EventModel.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
    }

    async getEventsBySort(sortBy: string, sortDirection: 'asc' | 'desc'): Promise<IEvent[] | null> {
        return await EventModel.find().sort({ [sortBy]: sortDirection }).exec();
    }

    async getEventsCount(): Promise<number> {
        return await EventModel.countDocuments().exec();
    }

    async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
        const { name, description, date, location, duration } = createEventDto;
        const newEvent = new EventModel({
            name,
            description,
            date: new Date(date),
            location,
            duration
        });

        await newEvent.save();
        return newEvent;
    }

}

export default EventService;
