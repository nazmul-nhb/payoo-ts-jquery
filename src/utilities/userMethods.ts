import { IUser } from "../types/interfaces";
import { getFromLocalStorage } from "./localStorage";

export const findUser = (mobile: string): IUser | { message: string } => {
	try {
		const users = getFromLocalStorage<IUser>("users");

		const user = users.find((savedUser) => savedUser.mobile === mobile);

		if (user) {
			return user;
        }
        
		throw new Error("User Not Found!");
	} catch (error) {
		console.error(error);
		if (error instanceof Error) {
			return { message: error.message };
        }
        
		return { message: "An Unknown Error Occurred!" };
	}
};
