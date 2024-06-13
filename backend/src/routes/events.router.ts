import express from 'express';
import { addEvent, deleteEvent, getEvent, getEvents, getLoggedInUserEvents, modifyEvent } from '../controllers/events.controller';
import isauthenticated from '../middlewares/isauthenticated.middleware';

const eventsRouter = express.Router();

eventsRouter.get('/', getLoggedInUserEvents);
eventsRouter.get('/all', getEvents);
eventsRouter.get('/:id', getEvent);
eventsRouter.post('/', isauthenticated, addEvent);
eventsRouter.put('/:id', isauthenticated, modifyEvent);
eventsRouter.delete('/:id', isauthenticated, deleteEvent);

export default eventsRouter;