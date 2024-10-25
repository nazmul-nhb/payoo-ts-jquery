import type { Transactions } from "./types";

export interface ICredentials {
	mobile: string;
	pin: string;
}

export interface IUser extends ICredentials {
	id: string;
	name: string;
	balance: number;
	creationTime: string | Date;
}

export interface IMenu {
	id: string;
	title: string;
	image: string;
}

export interface ITransaction {
	transactionId: string;
	userNumber: string;
	amount: number;
	previousBalance: number;
	currentBalance: number;
	transactionType: Transactions;
	transactionTime: string | Date;
}

export interface IAddMoney extends ITransaction {
	source: {
		bank: string;
		account: string;
	};
}

export interface IPayBill extends ITransaction {
	source: {
		institute: string;
		account: string;
	};
}

export interface ICashOut extends ITransaction {
	agent: string;
}

export interface ITransfer extends ITransaction {
	account: string;
}

export interface ICoupon extends ITransaction {
	account: string;
	coupon: string;
}

export interface ITransactionInput {
	amount: number;
	participant: string;
}

export interface IPayBillInput extends ITransactionInput {
	institute: string;
}

export interface IAddMoneyInput extends ITransactionInput {
	bank: string;
}

export interface ICouponInput {
	coupon: string;
}

export interface IUpdateResponse {
	success: boolean;
	message: string;
}