import { generateID } from "@nazmul-nhb/id-generator";
import type {
	IAddMoney,
	IAddMoneyInput,
	ICashOut,
	ICoupon,
	ICouponInput,
	IPayBill,
	IPayBillInput,
	ITransactionInput,
	ITransfer,
	IUpdateResponse,
	IUser,
} from "../types/interfaces";
import {
	getFromLocalStorage,
	saveToLocalStorage,
} from "../utilities/localStorage";
import { getTransactionDetails, updateUser } from "../utilities/userMethods";
import { generateTransactionId } from "../utilities/helpers";
import type { Transactions } from "../types/types";

/** Create an instance of User */
export class User {
	constructor(
		public readonly name: string,
		public readonly mobile: string,
		public readonly pin: string,
		private _balance: number = 5000,
		public readonly id: string = generateID({
			prefix: "payoo",
			length: 8,
			separator: "",
			caseOption: "upper",
		}),
		public readonly creationTime: Date = new Date()
	) {}

	/** Save user to localStorage */
	public save(): { insertedId: string } {
		const users = getFromLocalStorage<User>("users");

		const userExists = users.find((user) => user.mobile === this.mobile);

		if (userExists) {
			throw new Error(`${this.mobile} is Registered!`);
		}

		saveToLocalStorage<User>("users", this);

		return { insertedId: this.id };
	}

	/** Set current user to local storage */
	public setCurrentUser(): void {
		localStorage.setItem("payooUser", JSON.stringify(this.mobile));
	}

	/** Method to log out the user */
	public logOut(): void {
		localStorage.removeItem("payooUser");
	}

	/** Hydrate user from localStorage */
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

	/** Get user's current balance */
	get balance(): number {
		return this._balance;
	}

	/** Handle different types of transactions */
	private _handleTransaction<T>(
		type: Transactions,
		amount: number,
		extraDetails: Partial<T>,
		isAdding: boolean
	): IUpdateResponse {
		const previousBalance = this._balance;

		if (amount >= 50000) {
			return { success: false, message: "Limit is 50k per transaction!" };
		}

		if (!isAdding) {
			if (this._balance < amount) {
				return { success: false, message: "Insufficient Balance!" };
			}
			this._balance -= amount;
		} else {
			this._balance += amount;
		}

		// Update user in local storage
		const updated = updateUser(this.mobile, { balance: this._balance });

		if (updated.success) {
			// Generate common transaction details
			const transactionDetails = {
				transactionId: generateTransactionId(type),
				userNumber: this.mobile,
				amount,
				previousBalance,
				currentBalance: this._balance,
				transactionType: type,
				transactionTime: new Date(),
				...extraDetails,
			};

			// Save transaction to localStorage
			saveToLocalStorage<T>("transactions", transactionDetails as T);

			return { success: true, message: "Transaction Successful!" };
		}

		return { success: false, message: "Something Went Wrong!" };
	}

	/** Method to add money */
	public addMoney(details: IAddMoneyInput): IUpdateResponse {
		const { amount, bank, participant } = details;

		if (this.mobile === participant) {
			return { success: false, message: "Own number not allowed!" };
		}

		if (this._balance >= 500000) {
			return { success: false, message: "Balance limit reached!" };
		}

		return this._handleTransaction<IAddMoney>(
			"add-money",
			amount,
			{ source: { bank, account: participant } },
			true
		);
	}

	/** Method to cash out money */
	public cashOut(details: ITransactionInput): IUpdateResponse {
		const { amount, participant } = details;

		if (this.mobile === participant) {
			return { success: false, message: "Own number not allowed!" };
		}

		return this._handleTransaction<ICashOut>(
			"cash-out",
			amount,
			{ agent: participant },
			false
		);
	}

	/** Method to pay bill */
	public payBill(details: IPayBillInput): IUpdateResponse {
		const { institute, amount, participant } = details;

		if (this.mobile === participant) {
			return { success: false, message: "Own number not allowed!" };
		}

		return this._handleTransaction<IPayBill>(
			"pay-bill",
			amount,
			{ source: { institute, account: participant } },
			false
		);
	}

	/** Method to transfer money */
	public transferMoney(details: ITransactionInput): IUpdateResponse {
		const { amount, participant } = details;

		if (this.mobile === participant) {
			return { success: false, message: "Own number not allowed!" };
		}

		return this._handleTransaction<ITransfer>(
			"transfer",
			amount,
			{ account: participant },
			false
		);
	}

	/** Method to redeem coupon */
	public redeemCoupon(details: ICouponInput): IUpdateResponse {
		const { coupon, amount } = details;

		const transactions = getTransactionDetails(this.mobile);

		const couponRedeemed = (transactions as ICoupon[]).find(
			(transaction) => transaction.coupon === coupon
		);

		if (couponRedeemed) {
			return { success: false, message: "Coupon already redeemed!" };
		}

		return this._handleTransaction<ICoupon>(
			"coupons",
			amount,
			{ account: "Payoo Coupon", coupon },
			true
		);
	}
}
