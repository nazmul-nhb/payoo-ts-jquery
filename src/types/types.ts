import type {
	IAddMoneyInput,
	IPayBillInput,
	ITransactionInput,
} from "./interfaces";

export type Transactions = "add-money" | "cash-out" | "pay-bill" | "transfer";
export type TransactionDetails =
	| ITransactionInput
	| IPayBillInput
	| IAddMoneyInput;
