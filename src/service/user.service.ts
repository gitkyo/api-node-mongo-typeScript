import User from "../model/user.model";

export async function createUser(input: any) {
    try {
        const user = await User.create(input);
    
        return user;
    } catch (error:any) {
        throw new Error(error);
    }
}