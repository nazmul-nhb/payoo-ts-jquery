export const createTransactionHtml = (
	transactionId: string,
	imageSrc: string,
	header: string,
	title: string,
	time: string,
	amount: number,
	currentBalance: number,
	previousBalance: number,
	extraInfo: string
): string => {
	return (
		/*html*/
		`
            <div
                id="${transactionId}"
                class="flex items-center justify-between flex-wrap cursor-pointer"
            >
                <figure class="flex items-center gap-2">
                    <img src="${imageSrc}" alt="${title}" />
                    <div>
                        ${header}
                        <h5 class="text-xs text-gray-500">
                            <i class="fa-regular fa-clock"></i> ${time}
                        </h5>
                    </div>
                </figure>
                <div class="text-right font-semibold">
                    <h3>${title}</h3>
                    <h3><i class="fa-solid fa-sack-dollar"></i> $${amount}</h3>
                </div>
            </div>
            <div style="display: none;" id="extra-${transactionId}">
                ${extraInfo}
                <h3>
                    <i class="fa-solid fa-coins"></i> After: $${currentBalance}
                </h3>
                <h5>
                    <i class="fa-solid fa-coins"></i> Before: $${previousBalance}
                </h5>
                <h3>
                    <i class="fa-solid fa-money-check-dollar"></i>
                    <code id="copy-${transactionId}">
                        ${transactionId}
                    </code>
                </h3>
            </div>
        `
	);
};
