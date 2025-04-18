// @ts-check
import express from 'express';
import { getAllEvents } from '../controllers/eventController.js';

/**@type {express.Router}*/
const eventRouter = express.Router();

eventRouter.route('/').get(getAllEvents);

export default eventRouter;
