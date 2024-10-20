import { IUser } from "../types/interfaces";
import { getFromLocalStorage } from "./localStorage";

export const findUser = (mobile: string): IUser => {
	const users = getFromLocalStorage<IUser>("users");

	const user = users.find((savedUser) => savedUser.mobile === mobile);

	if (user) {
		return user;
	}

	throw new Error("User Not Found!");
};

export const getCurrentUser = () => {};
