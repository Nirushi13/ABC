import express from 'express';
import { submitQuery,getQueries,replyToQuery,getQueryById } from '../controllers/queryController.js'; 

const queryRouter = express.Router();


queryRouter.post('/add', submitQuery);
queryRouter.get('/get', getQueries);
queryRouter.post('/:id/reply', replyToQuery);
queryRouter.get('/get/:id', getQueryById);

export default queryRouter;
