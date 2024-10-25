import type {
	IAddMoney,
	ICashOut,
	IPayBill,
	ITransfer,
	IPayBillInput,
	IAddMoneyInput,
	ITransactionInput,
	ICoupon,
} from "./interfaces";

export type Transactions = "add-money" | "cash-out" | "pay-bill" | "transfer" | "coupons";
export type TransactionDetails = IAddMoney | ICashOut | IPayBill | ITransfer | ICoupon;

export type TransactionInputs =
	| ITransactionInput
	| IPayBillInput
	| IAddMoneyInput;
