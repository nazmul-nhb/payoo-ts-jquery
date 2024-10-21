import type {
	IAddMoney,
	IAddMoneyInput,
	ICashOut,
	IPayBill,
	IPayBillInput,
	ITransactionInput,
	ITransfer,
	IUpdateResponse,
	IUser,
} from "../types/interfaces";
import { generateID } from "@nazmul-nhb/id-generator";
import {
	getFromLocalStorage,
	saveToLocalStorage,
} from "../utilities/localStorage";
import { updateUser } from "../utilities/userMethods";
import { generateTransactionId } from "../utilities/helpers";
import type { Transactions } from "../types/types";

/**
 * Create an instance of User
 */
export class User {
	constructor(
		public name: string,
		public mobile: string,
		public pin: string,
		private balance: number = 5000,
		public id: string = generateID({
			prefix: "payoo",
			length: 8,
			separator: "",
			caseOption: "upper",
		}),
		public creationTime: Date = new Date()
	) {}

	/**
	 * Save user to localStorage
	 */
	public save(): { insertedId: string } {
		const users = getFromLocalStorage<User>("users");

		const userExists = users.find((user) => user.mobile === this.mobile);

		if (userExists) {
			throw new Error(`${this.mobile} is Registered!`);
		}

		saveToLocalStorage<User>("users", this);

		return { insertedId: this.id };
	}

	/**
	 * Hydrate user from localStorage
	 */
	static hydrate(user: IUser): User {
		return new User(
			user.name,
			user.mobile,
			user.pin,
			user.balance,
			user.id,
			new Date(user.creationTime)
		);
	}

	/**
	 * Get user's current balance
	 */
	public getBalance(): number {
		return this.balance;
	}

	/**
	 * Handle different types of transactions
	 */
	private handleTransaction<Transaction>(
		type: Transactions,
		amount: number,
		extraDetails: Partial<Transaction>,
		isAdding: boolean
	): IUpdateResponse {
		const previousBalance = this.balance;

		if (!isAdding) {
			if (this.balance < amount) {
				return { success: false, message: "Insufficient Balance!" };
			}
			this.balance -= amount;
		}

		this.balance += amount;

		// Update user in local storage
		const updated = updateUser(this.mobile, { balance: this.balance });

		if (updated.success) {
			// Generate common transaction details
			const transactionDetails = {
				transactionId: generateTransactionId(type),
				userNumber: this.mobile,
				amount,
				previousBalance,
				currentBalance: this.balance,
				transactionType: type,
				transactionTime: new Date(),
				...extraDetails,
			};

			// Save transaction to localStorage
			saveToLocalStorage<Transaction>(
				"transactions",
				transactionDetails as Transaction
			);

			return { success: true, message: "Transaction Successful!" };
		}

		return { success: false, message: "Something Went Wrong!" };
	}

	/**
	 * Method to add money
	 */
	public addMoney(details: IAddMoneyInput): IUpdateResponse {
		const { amount, bank, participant } = details;
		return this.handleTransaction<IAddMoney>(
			"add-money",
			amount,
			{ source: { bank, account: participant } },
			true
		);
	}

	/**
	 * Method to cash out money
	 */
	public cashOut(details: ITransactionInput): IUpdateResponse {
		const { amount, participant } = details;
		return this.handleTransaction<ICashOut>(
			"cash-out",
			amount,
			{ agent: participant },
			false
		);
	}

	/**
	 * Method to pay bill
	 */
	public payBill(details: IPayBillInput): IUpdateResponse {
		const { institute, amount, participant } = details;
		return this.handleTransaction<IPayBill>(
			"pay-bill",
			amount,
			{ source: { institute, account: participant } },
			false
		);
	}

	/**
	 * Method to transfer money
	 */
	public transferMoney(details: ITransactionInput): IUpdateResponse {
		const { amount, participant } = details;
		return this.handleTransaction<ITransfer>(
			"transfer",
			amount,
			{ account: participant },
			false
		);
	}
}
