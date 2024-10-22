import $ from "jquery";
import { notify } from "./notify";
import { NotyfNotification } from "notyf";
import type { TransactionDetails, Transactions } from "../types/types";

/**
 * Extracts transaction details from the form based on the transaction type.
 * Each form has different IDs, so we handle them dynamically.
 * @param type - Type of the transaction ('add-money', 'cash-out', 'transfer', 'pay-bill')
 * @returns Object containing pin & the necessary transaction details
 */
export const getTransactionDetails = (
	type: Transactions
): { pin: string; details: TransactionDetails } | NotyfNotification => {
	let amount: number;
	let pin: string;
	let details: TransactionDetails;

	switch (type) {
		case "add-money":
			amount = Number($("#add-amount").val() || 0);
			pin = $("#add-pin").val() as string;

			// Bank details specific to "add money"
			const bank = $("#bank-name").val() as string;
			const account = $("#bank-account").val() as string;

			if (!bank) return notify.error("Select a bank!");
			if (!account) return notify.error("Enter bank account number!");
			if (account.length !== 11) {
				return notify.error("Account must be 11 digits!");
			}

			details = {
				amount,
				participant: account,
				bank,
			};
			break;

		case "cash-out":
			amount = Number($("#cash-out-amount").val() || 0);
			pin = $("#cash-out-pin").val() as string;

			const agentAccount = $("#agent-account").val() as string;
			if (!agentAccount)
				return notify.error("Enter account number!");

			details = {
				amount,
				participant: agentAccount,
			};

			break;

		case "transfer":
			amount = Number($("#transfer-amount").val() || 0);
			pin = $("#transfer-pin").val() as string;

			const transferAccount = $("#transfer-account").val() as string;
			if (!transferAccount)
				return notify.error("Enter transfer account!");

			details = {
				amount,
				participant: transferAccount,
			};

			break;

		case "pay-bill":
			amount = Number($("#bill-amount").val() || 0);
			pin = $("#bill-pin").val() as string;

			const institute = $("#bill-name").val() as string;
			const billAccount = $("#bill-account").val() as string;

			if (!institute) return notify.error("Select an institute!");
			if (!billAccount) return notify.error("Enter bill account!");

			details = {
				amount,
				participant: billAccount,
				institute,
			};

			break;

		default:
			return notify.error("Invalid transaction type!");
	}

	// Common validations for amount and pin
	if (!amount || amount < 50) {
		return notify.error("Enter at least $50!");
	}

	if (!pin) {
		return notify.error("Enter Your PIN!");
	}

	if (!/^\d+$/.test(pin)) {
		return notify.error("Only 0-9 are Allowed!");
	}

	if (pin.length !== 4) {
		return notify.error("PIN must be 4 digits!");
	}

	return { pin, details };
};
