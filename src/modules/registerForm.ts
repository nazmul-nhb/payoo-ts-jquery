import $ from "jquery";
import { User } from "../classes/User";
import { notify } from "../utilities/notify";
import type { NotyfNotification } from "notyf";
import { hashPIN } from "../utilities/hashingUtils";
import { toggleButtonState, toggleTabs } from "./tabsToggler";

export const handleRegister = async (
	e: JQuery.ClickEvent
): Promise<NotyfNotification> => {
	e.preventDefault();

	const name = $("#name").val() as string;
	const mobile = $("#mobile-reg").val() as string;
	const pin = $("#reg-pin").val() as string;

	if (!name) {
		return notify.error("Your Name is Missing!");
	}

	if (!mobile) {
		return notify.error("Your Number is Missing!");
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

	const hashedPIN = await hashPIN(pin);

	if (hashedPIN) {
		const user = new User(name, mobile, hashedPIN);

		try {
			const result = user.save();

			if (result.insertedId) {
				// Clear the input fields
				$("#register-form input").val("");

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
		}
	}

	return notify.error("Something Went Wrong!");
};
