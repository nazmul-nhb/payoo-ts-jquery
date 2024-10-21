import { IAddMoney, ITransactionInput, IUser } from "../types/interfaces";
import { generateID } from "@nazmul-nhb/id-generator";
import {
	getFromLocalStorage,
	saveToLocalStorage,
} from "../utilities/localStorage";
import { updateUser } from "../utilities/userMethods";
import { generateTransactionId } from "../utilities/helpers";

export class User {
	constructor(
		public name: string,
		public mobile: string,
		public password: string,
		private balance: number = 0,
		public id: string = generateID({
			prefix: "payoo",
			length: 8,
			separator: "",
			caseOption: "upper",
		}),
		public creationTime: Date = new Date()
	) {}

	public save(): { insertedId: string } {
		const users = getFromLocalStorage<User>("users");

		const userExists = users.find((user) => user.mobile === this.mobile);

		if (userExists) {
			throw new Error(`${this.mobile} is Registered!`);
		}

		saveToLocalStorage<User>("users", this);

		return { insertedId: this.id };
	}

	static hydrate(user: IUser): User {
		return new User(
			user.name,
			user.mobile,
			user.password,
			user.balance,
			user.id,
			new Date(user.creationTime)
		);
	}

	public getBalance(): number {
		return this.balance;
	}

	public addMoney = (details: ITransactionInput): IAddMoney => {
		const { type, amount, participant } = details;

		const previousBalance = this.balance;

		this.balance += amount;

		updateUser(this.mobile, { balance: this.balance });

		const transactionDetails = {
			transactionId: generateTransactionId(type),
			userNumber: this.mobile,
			amount,
			previousBalance,
			currentBalance: this.balance + amount,
			source: participant,
			transactionType: type,
			transactionTime: new Date(),
		};

		saveToLocalStorage<IAddMoney>("transactions", transactionDetails);

		return transactionDetails;
	};
}
