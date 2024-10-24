export const createTransactionHtml = (
	transactionId: string,
    imageSrc: string,
    header: string,
	title: string,
	subTitle: string,
	amount: number,
	currentBalance: number,
	previousBalance: number,
	extraInfo: string
): string => {
	return (
		/*html*/
		`
            <div id="${transactionId}" class="flex items-center justify-between cursor-pointer">
                <figure class="flex items-center gap-2">
                    <img src="${imageSrc}" alt="${title}" />
                    <div>
                        <h3 class="font-semibold">${header}</h3>
                        <h5 class="text-xs text-gray-500">${subTitle}</h5>
                    </div>
                </figure>
                <div class="text-right font-semibold">
                    <h3>${title}</h3>
                    <h3>$${amount}</h3>
                </div>
            </div>
            <div style="display: none;" id="extra-${transactionId}">
                <h3 id="copy-${transactionId}">${transactionId}</h3>
                ${extraInfo}
                <h3>Current Balance: $${currentBalance}</h3>
                <h5>Previous Balance: $${previousBalance}</h5>
            </div>
        `
	);
};
