import type { IMenu } from "../types/interfaces";
import add from "../assets/icons/add.svg";
import pay from "../assets/icons/pay.svg";
import coupon from "../assets/icons/coupon.svg";
import transaction from "../assets/icons/transaction.svg";
import out from "../assets/icons/out.svg";
import transfer from "../assets/icons/transfer.svg";

export const menus: IMenu[] = [
	{
		id: "add-money",
		title: "Add Money",
		image: add,
	},
	{
		id: "cash-out",
		title: "CashOut",
		image: out,
	},
	{
		id: "transfer-money",
		title: "Transfer",
		image: transfer,
	},
	{
		id: "coupons",
		title: "Coupons",
		image: coupon,
	},
	{
		id: "pay-bill",
		title: "Pay Bill",
		image: pay,
	},
	{
		id: "transaction-history",
		title: "History",
		image: transaction,
	},
];

export { add, pay, out, coupon, transfer };
