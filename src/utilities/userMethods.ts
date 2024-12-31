import { User } from "../classes/User";
import type { TransactionDetails } from "../types/types";
import type { IUpdateResponse, IUser } from "../types/interfaces";
import { getTimeStamp } from "./formatDate";
import { getFromLocalStorage } from "./localStorage";
import { notify } from "./notify";

/**
 * Find user from local storage based on mobile number.
 * @param mobile User's mobile number as `string`.
 * @returns `User` instance of user or nothing if found none.
 */
export const findUser = (mobile: string): User | null => {
	const users = getFromLocalStorage<IUser>("users");

	const user = users.find((savedUser) => savedUser.mobile === mobile);

	if (!user) {
		return null;
	}

	return User.hydrate(user);
};

/**
 * Get current logged in user from local storage.
 * @returns Current logged in user or nothing if found none.
 */
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

/**
 * Update user's property in local storage.
 * @param mobile User's mobile number as string.
 * @param user Property of `User` to update.
 * @returns Success boolean flag and a message.
 */
export const updateUser = (
	mobile: string,
	user: Partial<IUser>
): IUpdateResponse => {
	const users = getFromLocalStorage<IUser>("users");

	const userIndex = users.findIndex(
		(savedUser) => savedUser.mobile === mobile
	);

	if (userIndex === -1) {
		return { success: false, message: "User Not Found!" };
	}

	const updatedUser = { ...users[userIndex], ...user };

	users[userIndex] = updatedUser;

	localStorage.setItem("users", JSON.stringify(users));

	return { success: true, message: "Successfully Updated!" };
};

/**
 * Get user's transaction details (history) from local storage.
 * @param mobile User's mobile number as string.
 * @returns Transaction details.
 */
export const getTransactionDetails = (mobile: string): TransactionDetails[] => {
	const transaction = getFromLocalStorage<TransactionDetails>("transactions");

	const userTransaction = transaction
		.filter((trans) => trans.userNumber === mobile)
		.sort(
			(a, b) =>
				getTimeStamp(b.transactionTime) -
				getTimeStamp(a.transactionTime)
		);

	return userTransaction;
};
