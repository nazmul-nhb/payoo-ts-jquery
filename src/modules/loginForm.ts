import $ from "jquery";
import { notify } from "../utilities/notify";
import { matchPIN } from "../utilities/hashingUtils";
import { findUser, setCurrentUser } from "../utilities/userMethods";
import { NotyfNotification } from "notyf";
import { showMainScreen } from "./toggleScreens";
import { showBalance } from "./showBalance";

export const handleLogin = async (
	e: JQuery.ClickEvent
): Promise<NotyfNotification> => {
	e.preventDefault();

	const mobile = $("#mobile").val() as string;
	const pin = $("#login-pin").val() as string;

	if (!mobile) {
		return notify.error("Mobile Number is Missing!");
	}

	if (mobile.length !== 11) {
		return notify.error("Number Must Be 11 Digits!");
	}

	if (!pin) {
		return notify.error("Your PIN is Missing!");
	}

	if (!/^\d+$/.test(pin)) {
		return notify.error("Only 0-9 are Allowed!");
	}

	if (pin.length !== 4) {
		return notify.error("PIN Must Be 4 Digits!");
	}

	try {
		const user = findUser(mobile);

		const isMatched = await matchPIN(pin, user.pin);

		if (isMatched) {
			// Clear the input field
			$("#mobile").val("");
			$("#login-pin").val("");

			// Set logged in user as current user and save in localStorage
			setCurrentUser(user.mobile);

			// Hide login/register screen & Show main screen
			showMainScreen();
			showBalance(user.getBalance());

			return notify.success("Successfully Logged In!");
		}

		return notify.error("Wrong PIN!");
	} catch (error) {
		if (error instanceof Error) {
			return notify.error(error.message);
		}

		return notify.error("An Unknown Error Occurred!");
	}
};
