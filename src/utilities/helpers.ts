import { generateID } from "@nazmul-nhb/id-generator";
import type { Transactions } from "../types/types";

export const generateTransactionId = (type: Transactions): string => {
	return generateID({
		prefix: type,
		length: 4,
		separator: "-",
		caseOption: "upper",
	});
};