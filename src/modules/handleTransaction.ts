import $ from "jquery";
import { notify } from "../utilities/notify";
import type { NotyfNotification } from "notyf";
import { matchPIN } from "../utilities/hashingUtils";
import { getCurrentUser } from "../utilities/userMethods";
import { showBalance } from "../modules/showBalance";
import type { IUpdateResponse } from "../types/interfaces";
import type { TransactionInputs, Transactions } from "../types/types";
import { getTransactionInputs } from "../utilities/transactions";

/**
 * Handles transaction processes.
 * @param e - Event triggered by user.
 * @param type - Type of the transaction.
 * @param transactionMethod - The method corresponding to the transaction type.
 */
export const handleTransaction = async (
	e: JQuery.ClickEvent,
	type: Transactions,
	transactionMethod: (details: TransactionInputs) => IUpdateResponse
): Promise<NotyfNotification | null> => {
	e.preventDefault();

	try {
		const user = getCurrentUser();

		if (!user) {
			return notify.error("User Not Found!");
		}

		const detailsResult = getTransactionInputs(type);

		if ("pin" in detailsResult && "details" in detailsResult) {
			const { pin, details } = detailsResult;

			const isMatched = await matchPIN(pin, user.pin);
			if (isMatched) {
				let transactionResult = transactionMethod(details);

				if (transactionResult.success) {
					// Clear form fields
					$("form input").val("");

					const updatedUser = getCurrentUser();

					updatedUser && showBalance(updatedUser.getBalance());
					return notify.success(transactionResult.message);
				} else {
					return notify.error(transactionResult.message);
				}
			}

			return notify.error("Wrong PIN!");
		}
		return null;
	} catch (error) {
		if (error instanceof Error) {
			return notify.error(error.message);
		}
		return notify.error("Something went wrong!");
	}
};
