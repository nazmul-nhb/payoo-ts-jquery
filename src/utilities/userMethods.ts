import { User } from "../classes/User";
import { IUser } from "../types/interfaces";
import { getFromLocalStorage } from "./localStorage";
import { notify } from "./notify";

export const findUser = (mobile: string): User => {
	const users = getFromLocalStorage<IUser>("users");

	const user = users.find((savedUser) => savedUser.mobile === mobile);

	if (!user) {
		throw new Error("User Not Found!");
	}

	return User.hydrate(user);
};

export const getCurrentUser = (): User | null => {
	const mobile = localStorage.getItem("payooUser");

	if (!mobile) {
		return null;
	}

	try {
		const user = findUser(JSON.parse(mobile));

		return user;
	} catch (error) {
		if (error instanceof Error) {
			notify.error(error.message);
		}
		return null;
	}
};

export const setCurrentUser = (mobile: string): void => {
	localStorage.setItem("payooUser", JSON.stringify(mobile));
};

export const logOut = (): void => {
	localStorage.removeItem("payooUser");
	notify.success("Successfully Logged Out!");
};
