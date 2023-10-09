import mongoose from "mongoose";
import config from "config";
import bcrypt from "bcrypt";

//ici l'interface permet de définir les types de données
export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

//le schema permet de définir la structure des données
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

//middleware qui va detecter les sauvegardes sur le schema UserSchema, lorsqu'il y a un event, il va lancer le code suivant afin de hasher le mot de passe
UserSchema.pre("save", async function (next) {
    let user = this as UserDocument;
  
    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();
  
    // Random additional data
    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
  
    const hash = await bcrypt.hashSync(user.password, salt);
  
    // Replace the password with the hash
    user.password = hash;
  
    return next();
  });
  
  // methode qui permet de comparer le mot de passe entré par l'utilisateur avec le mot de passe hashé dans la base de données
  UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    const user = this as UserDocument;
  
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
  };


//création d'un model User qui se base sur le schema UserSchema
const User = mongoose.model<UserDocument>("User", UserSchema);

//export pour utiliser ailleurs
export default User;
