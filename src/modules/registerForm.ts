import $ from "jquery";
import { notify } from "../utilities/notify";
import { hashPassword } from "../utilities/passwordUtils";

export const handleRegister = async (e: JQuery.ClickEvent) => {
	e.preventDefault();

	console.log(e);

	const name = $("#name").val() as string;
	const mobile = $("#mobile-reg").val() as string;
	const password = $("#password-reg").val() as string;

	if (!name) {
		return notify.error("Your Name is Missing!");
	}

	if (!mobile) {
		return notify.error("Mobile Number is Missing!");
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

	const hp = await hashPassword(password);
	console.log(hp);
	notify.success(mobile);

	// Clear the input field
	$("#name").val("");
	$("#mobile-reg").val("");
	$("#password-reg").val("");
};
