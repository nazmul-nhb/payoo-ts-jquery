import $ from "jquery";
import { notify } from "../utilities/notify";
import { matchPIN } from "../utilities/hashingUtils";
import { findUser } from "../utilities/userMethods";
import { NotyfNotification } from "notyf";
import { setIsLoading } from "./showLoading";
import { loadUserFunctionalities } from "./loadFunctionalities";

export const handleLogin = async (
	e: JQuery.ClickEvent
): Promise<NotyfNotification> => {
	e.preventDefault();

	const mobile = $("#mobile").val() as string;
	const pin = $("#login-pin").val() as string;

	if (!mobile) {
		return notify.error("Enter Your Mobile Number!");
	}

	if (mobile.length !== 11) {
		return notify.error("Number Must Be 11 Digits!");
	}

	if (!pin) {
		return notify.error("Enter Your PIN!");
	}

	if (!/^\d+$/.test(pin)) {
		return notify.error("Only 0-9 are Allowed!");
	}

	if (pin.length !== 4) {
		return notify.error("PIN Must Be 4 Digits!");
	}

	try {
		setIsLoading(true);

		const user = findUser(mobile);

		const isMatched = await matchPIN(pin, user.pin);

		if (isMatched) {
			// Clear the input field
			$("#login-form input").val("");

			// Set logged in user as current user and save in localStorage
			user.setCurrentUser();

			// Load all user related UI and functionalities
			loadUserFunctionalities(user);

			return notify.success("Successfully Logged In!");
		}

		return notify.error("Wrong PIN!");
	} catch (error) {
		if (error instanceof Error) {
			return notify.error(error.message);
		}

		return notify.error("An Unknown Error Occurred!");
	} finally {
		setTimeout(() => setIsLoading(false), 500);
	}
};
