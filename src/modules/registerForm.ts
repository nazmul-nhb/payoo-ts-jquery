import $ from "jquery";
import { notify } from "../utilities/notify";
import { hashPassword } from "../utilities/passwordUtils";
import { User } from "../classes/User";
import { NotyfNotification } from "notyf";
import { toggleButtonState, toggleTabs } from "./tabsToggler";
import { setIsLoading } from "./showLoading";

export const handleRegister = async (
	e: JQuery.ClickEvent
): Promise<NotyfNotification> => {
	e.preventDefault();

	setIsLoading(true);

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

		try {
			const result = user.save();

			if (result.insertedId) {
				// Clear the input fields
				$("#name").val("");
				$("#mobile-reg").val("");
				$("#password-reg").val("");

				// Show Login page
				toggleTabs($("#login-form"), $("#register-form"));
				toggleButtonState($("#login-tab"), $("#register-tab"));

				return notify.success("Successfully Registered!");
			}
		} catch (error) {
			if (error instanceof Error) {
				return notify.error(error.message);
			}

			return notify.error("An Unknown Error Occurred!");
		} finally {
			setIsLoading(false);
		}
	}

	return notify.error("Something Went Wrong!");
};
