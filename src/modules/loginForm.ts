import $ from "jquery";
import { notify } from "../utilities/notify";
import { matchPassword } from "../utilities/passwordUtils";
import { findUser, setCurrentUser } from "../utilities/userMethods";
import { NotyfNotification } from "notyf";
import { showMainScreen } from "./toggleScreens";

export const handleLogin = async (
	e: JQuery.ClickEvent
): Promise<NotyfNotification> => {
	e.preventDefault();

	const mobile = $("#mobile").val() as string;
	const password = $("#password").val() as string;

	if (!mobile) {
		return notify.error("Mobile Number is Missing!");
	}

	if (mobile.length !== 11) {
		return notify.error("Number Must Be 11 Digits!");
	}

	if (!password) {
		return notify.error("Your Password is Missing!");
	}

	if (!/^\d+$/.test(password)) {
		return notify.error("Only 0-9 are Allowed!");
	}

	if (password.length !== 4) {
		return notify.error("Password Must Be 4 Digits!");
	}

	try {
		const user = findUser(mobile);

		const isMatched = await matchPassword(password, user.password);

		if (isMatched) {
			// Clear the input field
			$("#mobile").val("");
			$("#password").val("");

			// Set logged in user as current user and save in localStorage
			setCurrentUser(user.mobile);

			// Hide login/register screen & Show main screen
			showMainScreen();

			return notify.success("Successfully Logged In!");
		}

		return notify.error("Wrong Password!");
	} catch (error) {
		if (error instanceof Error) {
			return notify.error(error.message);
		}

		return notify.error("An Unknown Error Occurred!");
	}
};
