import $ from "jquery";
import { getTransactionDetails } from "../utilities/userMethods";
import { IAddMoney, ICashOut, IPayBill, ITransfer } from "../types/interfaces";
import { add, out, pay, transfer } from "../utilities/menus";
import { formatDateWithTime } from "../utilities/formatDate";
import { notify } from "../utilities/notify";

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

		if (transactionType === "add-money") {
			const { source } = transaction as IAddMoney;
			transDiv.html(
				/* html */
				`
				<div id="${transactionId}" class="flex items-center justify-between cursor-pointer">
					<figure class="flex items-center gap-2">
						<img src="${add}" alt="Add Money" />
						<div>
							<h3>${source.bank}</h3>
							<h5>${formatDateWithTime(transactionTime)}</h5>
						</div>
					</figure>
					<h3>$${amount}</h3>
				</div>
				`
			);
		} else if (transactionType === "pay-bill") {
			const { source } = transaction as IPayBill;
			transDiv.html(
				/* html */
				`
				<div id="${transactionId}" class="flex items-center justify-between cursor-pointer">
					<figure class="flex items-center gap-2">
						<img src="${pay}" alt="Pay Bill" />
						<div>
							<h3>${source.institute}</h3>
							<h5>${formatDateWithTime(transactionTime)}</h5>
						</div>
					</figure>
					<h3>$${amount}</h3>
				</div>
				`
			);
		} else if (transactionType === "cash-out") {
			const { agent } = transaction as ICashOut;

			transDiv.html(
				/* html */
				`
				<div id="${transactionId}" class="flex items-center justify-between cursor-pointer">
					<figure class="flex items-center gap-2">
						<img src="${out}" alt="Cash Out" />
						<div>
							<h3>${agent}</h3>
							<h5>${formatDateWithTime(transactionTime)}</h5>
						</div>
					</figure>
					<h3>$${amount}</h3>
				</div>
				`
			);
		} else if (transactionType === "transfer") {
			const { account } = transaction as ITransfer;

			transDiv.html(
				/* html */
				`
				<div id="${transactionId}" class="flex items-center justify-between cursor-pointer">
					<figure class="flex items-center gap-2">
						<img src="${transfer}" alt="Transfer" />
						<div>
							<h3>${account}</h3>
							<h5>${formatDateWithTime(transactionTime)}</h5>
						</div>
					</figure>
					<h3>$${amount}</h3>
				</div>
				`
			);
		}

		historyContainer.append(transDiv);

		$(`#${transactionId}`).on("click", () => {
			notify.success(`Clicked ${transactionId}`);
		});
	});
};
