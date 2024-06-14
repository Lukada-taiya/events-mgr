import express from 'express';
import { addEvent, deleteEvent, getEvent, getEvents, getLoggedInUserEvents, modifyEvent } from '../controllers/events.controller';
import isauthenticated from '../middlewares/isauthenticated.middleware';
import passport from 'passport';

const eventsRouter = express.Router();

eventsRouter.get('/', getLoggedInUserEvents);
eventsRouter.get('/all', getEvents);
eventsRouter.get('/:id', getEvent);
eventsRouter.post('/', passport.authenticate('bearer', { session: false }),isauthenticated, addEvent);
eventsRouter.put('/:id',passport.authenticate('bearer', { session: false }), isauthenticated, modifyEvent);
eventsRouter.delete('/:id',passport.authenticate('bearer', { session: false }), isauthenticated, deleteEvent);

export default eventsRouter;