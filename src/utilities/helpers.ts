import { generateID } from "@nazmul-nhb/id-generator";
import type { TransactionType } from "../types/types";

export const generateTransactionId = (type: TransactionType): string => {
	return generateID({
		prefix: type,
		length: 4,
		separator: "-",
		caseOption: "upper",
	});
};
