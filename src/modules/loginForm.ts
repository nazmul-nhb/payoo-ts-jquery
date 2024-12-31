import $ from "jquery";
import { notify } from "../utilities/notify";
import { verifyPIN } from "../utilities/hashingUtils";
import { findUser } from "../utilities/userMethods";
import { setIsLoading } from "./showLoading";
import { loadUserFunctionalities } from "./loadFunctionalities";

/**
 * Handle user login.
 * @param e Click event.
 */
export const handleLogin = async (e: JQuery.ClickEvent) => {
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

		if (!user) {
			throw new Error("Invalid Credentials!");
		}

		const isMatched = await verifyPIN(pin, user.pin);

		if (!isMatched) {
			throw new Error("Invalid Credentials!");
		}

		// Clear the input field
		$("#login-form input").val("");

		// Set logged in user as current user and save in localStorage
		user.setCurrentUser();

		// Load all user related UI and functionalities
		loadUserFunctionalities(user);

		return notify.success("Successfully Logged In!");
	} catch (error) {
		setTimeout(() => {
			if (error instanceof Error) {
				notify.error(error.message);
			} else {
				notify.error("An Unknown Error Occurred!");
			}
		}, 500);
	} finally {
		setTimeout(() => setIsLoading(false), 500);
	}
};
