export interface ICredentials {
	mobile: string;
	password: string;
}

export interface IUser extends ICredentials {
	id: string;
	name: string;
	balance: number;
	creationTime: string;
}
