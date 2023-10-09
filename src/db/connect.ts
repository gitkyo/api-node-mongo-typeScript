import mongoose from "mongoose";
import config from "config";
import log from "../logger";

function connect() {
  const dbUri = config.get("dbUri") as string;
 
  //exemple de chainage de promesse pour se connecter à la base de données
  return mongoose
    .connect(dbUri, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,    
    })
    .then(() => {
      log.info("Database connected"); 
    })
    .catch((error) => {
      log.error("db error", error);
      //process.exit(1) permet de quitter le processus node
      process.exit(1);
    });
}

export default connect;
