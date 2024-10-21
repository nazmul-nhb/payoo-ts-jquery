import { IMenu } from "../types/interfaces";
import add from "../assets/icons/add.svg";
import manage from "../assets/icons/manage.svg";
import pay from "../assets/icons/pay.svg";
import transaction from "../assets/icons/transaction.svg";
import out from "../assets/icons/out.svg";
import transfer from "../assets/icons/transfer.svg";

export const menus: IMenu[] = [
	{
		id: "01",
		title: "Add Money",
		image: add,
	},
	{
		id: "02",
		title: "Cash Out",
		image: out,
	},
	{
		id: "03",
		title: "Transfer Money",
		image: transfer,
	},
	{
		id: "04",
		title: "Manage Finance",
		image: manage,
	},
	{
		id: "05",
		title: "Pay Bill",
		image: pay,
	},
	{
		id: "06",
		title: "Transactions",
		image: transaction,
	},
];
