import { generateID } from "@nazmul-nhb/id-generator";
import type { Transactions } from "../types/types";

/**
 * Generate transaction id based on transaction type.
 * @param type Type of transaction.
 * @returns Generated ID.
 */
export const generateTransactionId = (type: Transactions): string => {
	return generateID({
		prefix: type,
		length: 8,
		separator: "-",
		caseOption: "upper",
	});
};
