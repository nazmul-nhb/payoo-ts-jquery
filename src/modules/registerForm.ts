import $ from "jquery";
import { notify } from "../utilities/notify";
import { hashPassword } from "../utilities/passwordUtils";
import { User } from "../classes/User";

export const handleRegister = async (e: JQuery.ClickEvent) => {
	e.preventDefault();

	const name = $("#name").val() as string;
	const mobile = $("#mobile-reg").val() as string;
	const password = $("#password-reg").val() as string;

	if (!name) {
		return notify.error("Your Name is Missing!");
	}

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

	const hashedPassword = await hashPassword(password);

	if (hashedPassword) {
		const user = new User(name, mobile, hashedPassword);

		const result = user.saveUser();

		if ("insertedId" in result) {
			notify.success("Successfully Registered!");

			// Clear the input field
			$("#name").val("");
			$("#mobile-reg").val("");
			$("#password-reg").val("");
		} else {
			notify.error(result.message);
		}
	}
};
