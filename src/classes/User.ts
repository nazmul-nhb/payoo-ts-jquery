import { generateID } from "@nazmul-nhb/id-generator";
import {
	getFromLocalStorage,
	saveToLocalStorage,
} from "../utilities/localStorage";

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

	public getBalance(): number {
		return this.balance;
	}

	public saveUser(): { insertedId: string } | { message: string } {
		try {
			const users = getFromLocalStorage<User>("users");

			const userExists = users.find(
				(user) => user.mobile === this.mobile
			);

			if (userExists) {
				throw new Error(`${this.mobile} is Registered!`);
			}

			saveToLocalStorage<User>("users", this);

			return { insertedId: this.id };
		} catch (error) {
			if (error instanceof Error) {
				return { message: error.message };
			}
			return { message: "An Unknown Error Occurred!" };
		}
	}
}
