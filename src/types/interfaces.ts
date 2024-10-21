import { TransactionType } from "./types";

export interface ICredentials {
	mobile: string;
	password: string;
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
	transactionType: TransactionType;
	transactionTime: string | Date;
}

export interface IAddMoney extends ITransaction {
	source: string;
}

export interface ITransactionInput {
	amount: number;
	participant: string;
	type: TransactionType;
}

export interface IUpdateResponse {
	success: boolean;
	message?: string;
}
