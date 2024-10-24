import $ from "jquery";
import { getTransactionDetails } from "../utilities/userMethods";
import { IAddMoney, ICashOut, IPayBill, ITransfer } from "../types/interfaces";
import { add, out, pay, transfer } from "../utilities/menus";
import { formatDateTime } from "../utilities/formatDate";
import { notify } from "../utilities/notify";
import { createTransactionHtml } from "./transactionCard";

export const showHistory = (mobile: string): void => {
	const historyContainer = $("#transaction-history-section");
	historyContainer.html("");

	const transactions = getTransactionDetails(mobile);

	if (!transactions.length) {
		const transDiv = $("<div></div>").html(
			/*html*/
			`
                <h3 class="text-2xl text-center font-bold text-red-700 mt-4">No Transaction Yet!</h3>
                <div class="relative w-20 h-20 my-8 mx-auto">
					<div
						class="absolute inset-0 rounded-full border-8 border-red-200 border-t-red-600 animate-spin"
					></div>
					<span
							class="absolute inset-0 text-5xl font-black text-red-600 flex items-center justify-center animate-pulse"
					>
							!
					</span>
				</div>
            `
		);

		historyContainer.append(transDiv);
	}

	transactions.forEach((transaction) => {
		const {
			amount,
			currentBalance,
			previousBalance,
			transactionId,
			transactionTime,
			transactionType,
		} = transaction;

		const transDiv = $("<div></div>");

		let imageSrc = "",
			header = "",
			title = "",
			extraInfo = "";

		// Add logic for different transaction types
		if (transactionType === "add-money") {
			const { source } = transaction as IAddMoney;
			imageSrc = add;
			header = source.bank;
			title = "Add Money";
			extraInfo = `<h3>From Account: ${source.account}</h3>`;
		} else if (transactionType === "pay-bill") {
			const { source } = transaction as IPayBill;
			imageSrc = pay;
			header = source.institute;
			title = "Bill Pay";
			extraInfo = `<h3>To Account: ${source.account}</h3>`;
		} else if (transactionType === "cash-out") {
			const { agent } = transaction as ICashOut;
			imageSrc = out;
			header = agent;
			title = "Cash Out";
			extraInfo = `<h3>Agent Account: ${agent}</h3>`;
		} else if (transactionType === "transfer") {
			const { account } = transaction as ITransfer;
			imageSrc = transfer;
			header = account;
			title = "Transfer";
			extraInfo = `<h3>To Account: ${account}</h3>`;
		}

		// Use the template function to create the HTML
		const transactionHtml = createTransactionHtml(
			transactionId,
			imageSrc,
			header,
			title,
			formatDateTime(transactionTime),
			amount,
			currentBalance,
			previousBalance,
			extraInfo
		);

		// Add the HTML to the wrapper div
		transDiv.html(transactionHtml);

		// Add styles to the wrapper div
		transDiv.addClass(
			"border border-gray-500 rounded-lg shadow-md shadow-gray-500 px-2 py-1"
		);

		// Append all transactions one by one in the history container
		historyContainer.append(transDiv);

		// Toggle between extra transaction info show/hide
		$(`#${transactionId}`).on("click", () => {
			$(`#extra-${transactionId}`)
				.addClass("ml-8 mt-1 py-1 border-t border-t-gray-400")
				.toggle(500);
		});

		// Copy transaction id
		$(`#copy-${transactionId}`)
			.addClass(
				"cursor-pointer text-xs text-ellipsis text-nowrap overflow-x-hidden"
			)
			.on("click", () => {
				navigator.clipboard
					.writeText(transactionId)
					.then(() => notify.success("Copied Transaction ID!"))
					.catch(() => notify.success("Cannot Copy the Text!"));
			});
	});
};
