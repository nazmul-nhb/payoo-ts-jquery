import $ from "jquery";
import { notify } from "../utilities/notify";
import { matchPassword } from "../utilities/passwordUtils";
import { findUser } from "../utilities/userMethods";
import { NotyfNotification } from "notyf";

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

	const userResult = findUser(mobile);

	if ("message" in userResult) {
		return notify.error(userResult.message);
	}

	const user = userResult;

	const isMatched = await matchPassword(password, user.password);

	if (isMatched) {
		// Clear the input field
		$("#mobile").val("");
		$("#password").val("");

		return notify.success("Successfully Logged In!");
    }
    
	return notify.error("Wrong Password!");
};
