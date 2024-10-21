import $ from "jquery";
import { notify } from "../utilities/notify";
import { matchPIN } from "../utilities/hashingUtils";
import type { NotyfNotification } from "notyf";
import { getCurrentUser } from "../utilities/userMethods";
import { showBalance } from "./showBalance";

export const handleAddMoney = async (
	e: JQuery.ClickEvent
): Promise<NotyfNotification> => {
	e.preventDefault();

	const bank = $("#bank-name").val() as string;
	const account = $("#bank-account").val() as string;
	const amount = Number($("#add-amount").val() || 0);
	const pin = $("#add-pin").val() as string;

	if (!bank) {
		return notify.error("Select A Bank!");
	}

	if (!account) {
		return notify.error("Enter Account Number!");
	}

	if (account.length !== 11) {
		return notify.error("Account Must Be 11 Digits!");
	}

	if (!amount || amount < 50) {
		return notify.error("Add at least $50!");
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
		const user = getCurrentUser();

		if (user) {
			const isMatched = await matchPIN(pin, user.pin);

			if (isMatched) {
				const result = user.addMoney({
					amount,
					bank,
					participant: account,
				});

				if (result.success) {
					// Clear the input field
					$("#bank-name").val("");
					$("#bank-account").val("");
					$("#add-amount").val("");
					$("#add-pin").val("");

					showBalance(user.getBalance());

					return notify.success(`$${amount} Added to Account!`);
				}
				return notify.error(result.message);
			}
		}

		return notify.error("Wrong PIN!");
	} catch (error) {
		if (error instanceof Error) {
			return notify.error(error.message);
		}

		return notify.error("Something Went Wrong!");
	}
};
