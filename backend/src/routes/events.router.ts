import express from 'express';
import { addEvent, deleteEvent, getEvent, getEvents, getLoggedInUserEvents, modifyEvent } from '../controllers/events.controller';
import isauthenticated from '../middlewares/isauthenticated.middleware';
import passport from 'passport';

const eventsRouter = express.Router();

/**
 * @openapi
 * /events:
 *   get: 
 *     tags:
 *       - AllEvents
 *     description: Returns all the events related to the logged in user
 *     responses:
 *       200:
 *         description: All events of the user.
 */

eventsRouter.get('/', getLoggedInUserEvents);
eventsRouter.get('/all', getEvents);
eventsRouter.get('/:id', getEvent);
eventsRouter.post('/', passport.authenticate('bearer', { session: false }),isauthenticated, addEvent);
eventsRouter.put('/:id',passport.authenticate('bearer', { session: false }), isauthenticated, modifyEvent);
eventsRouter.delete('/:id',passport.authenticate('bearer', { session: false }), isauthenticated, deleteEvent);

export default eventsRouter;