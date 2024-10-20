import $ from "jquery";
import { notify } from "../utilities/notify";
import { hashPassword } from "../utilities/passwordUtils";

export const handleLogin = async (e: JQuery.ClickEvent) => {
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

	const hp = await hashPassword(password);
	console.log(hp);
	notify.success(mobile);

	$("#mobile").val("");
	$("#password").val("");
};
