import $ from "jquery";
import { User } from "../classes/User";
import { notify } from "../utilities/notify";
import { hashPIN } from "../utilities/hashingUtils";
import { toggleButtonState, toggleTabs } from "./tabsToggler";
import { setIsLoading } from "./showLoading";

/**
 * Handle user registration.
 * @param e Click event.
 */
export const handleRegister = async (e: JQuery.ClickEvent) => {
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

	try {
		setIsLoading(true);

		const hashedPIN = await hashPIN(pin);

		if (!hashedPIN) {
			throw new Error("Something Went Wrong!");
		}

		const user = new User(name, mobile, hashedPIN);
		const result = user.save();

		if (result.insertedId) {
			// Clear the input fields
			$("#register-form input").val("");

			// Show Login page
			toggleTabs($("#login-form"), $("#register-form"));
			toggleButtonState($("#login-tab"), $("#register-tab"));

			return notify.success("Successfully Registered!");
		} else {
			throw new Error("Something Went Wrong!");
		}
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
