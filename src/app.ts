import express from 'express';
import config from 'config'; 
import log from './logger'; 
import connect from './db/connect';


//ici la méthode get permet de récupérer la valeur du port dans le fichier config/default.json
const port = config.get("port") as number;
const host = config.get("host") as string; 

const app = express(); 

//les middleware pour accepter les requêtes json et urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import des routes
import routes from './routes';
routes(app);

//démarrage 
app.listen(port, async () => {
    
    await connect();   
    log.info(`Server running at http://${host}:${port}`);
}); 

