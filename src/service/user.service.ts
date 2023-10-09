import User from "../model/user.model";

export async function createUser(input: any) {
    try {
        const user = await User.create(input);
    
        return user;
    } catch (error) {
        throw new Error(error);
    }
}