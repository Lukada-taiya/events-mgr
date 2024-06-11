import express from 'express';
import { addEvent, deleteEvent, getEvent, getEvents, getLoggedInUserEvents, modifyEvent } from '../controllers/events.controller';

const eventsRouter = express.Router();

eventsRouter.get('/', getLoggedInUserEvents);
eventsRouter.get('/all', getEvents);
eventsRouter.get('/:id', getEvent);
eventsRouter.post('/', addEvent);
eventsRouter.put('/:id', modifyEvent);
eventsRouter.delete('/:id', deleteEvent);

export default eventsRouter;