import $ from "jquery";
import { getTransactionDetails } from "../utilities/userMethods";

export const showHistory = (mobile: string): void => {
	const historyContainer = $("#transaction-history-section");
	historyContainer.html("");

	const transactions = getTransactionDetails(mobile);

	const transDiv = $("<div></div>");

	if (!transactions.length) {
		transDiv.html(
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
};
