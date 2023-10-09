//pino permet de logger les erreurs et les infos de l'application
import logger from "pino";

//dayjs permet de logger la date et l'heure
import dayjs from "dayjs";

const log = logger({   
    
    base: {
        //pid veut dire process id
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`, 
});

export default log;    