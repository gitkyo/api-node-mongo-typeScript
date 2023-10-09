// Express, Request, Response sont des types de données
import { Express, Request, Response } from 'express';
import { createUserHandler } from './controller/user.controller';
import validateRequest from './middleware/validateRequest';
import { createUserSchema } from './schema/user.schema';

//ici export default permet d'exporter la fonction sans devoir l'importer avec des accolades
export default function (app: Express) {
    //renvoi un code 200 si l'application est en ligne sur l'url /healthcheck
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

    // prepare to later

    //Register user
    //POST api/user
    app.post('/api/user', validateRequest(createUserSchema), createUserHandler);

    //Login 
    //POST api/sessions

    //Get user's session
    //GET api/sessions

    //Logout
    //DELETE api/sessions
}