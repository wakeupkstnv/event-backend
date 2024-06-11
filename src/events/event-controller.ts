import { Request, Response } from 'express';
import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventService from './event-service';

class EventController {
    private eventService: EventService;

    constructor(eventService: EventService) {
        this.eventService = eventService;
    }

    createEvent = async (req: Request, res: Response): Promise<void> => {
        try {
            const createEventDto: CreateEventDto = req.body;
            const event = await this.eventService.createEvent(createEventDto);
            res.status(201).json(event);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }

    getEventByUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = (req as any).user;
            const userCity = user.city;
            const events = await this.eventService.getEventsByCity(userCity);
            res.status(200).json(events);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }

    getEventsBySort = async (req: Request, res: Response): Promise<void> => {
        try {
            const { sortBy = 'rating', sortDirection = 'desc' } = req.query;
            const events = await this.eventService.getEventsBySort(sortBy as string, sortDirection as 'asc' | 'desc');
            res.status(200).json(events);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }

    getEvents = async (req: Request, res: Response): Promise<void> => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const events = await this.eventService.getEvents(page, limit);
            const total = await this.eventService.getEventsCount();

            res.status(200).json({
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                data: events,
            });
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }

    getSize = async (req: Request, res: Response): Promise<void> => {
        try {
            const events = (await this.eventService.getEvents(1, 0)).length;
            res.status(200).json(events);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }

    getEventById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const event = await this.eventService.getEventById(id);
            if (!event) {
                res.status(404).json({ message: 'Event not found' });
                return;
            }
            res.status(200).json(event);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }
}

export default EventController;
