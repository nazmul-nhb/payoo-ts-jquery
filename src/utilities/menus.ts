import type { IMenu } from "../types/interfaces";
import addImage from "../assets/icons/add.svg";
import payImage from "../assets/icons/pay.svg";
import outImage from "../assets/icons/out.svg";
import couponImage from "../assets/icons/coupon.svg";
import transferImage from "../assets/icons/transfer.svg";
import transactionImage from "../assets/icons/transaction.svg";

export const menus: IMenu[] = [
	{
		id: "add-money",
		title: "Add Money",
		image: addImage,
	},
	{
		id: "cash-out",
		title: "Cash Out",
		image: outImage,
	},
	{
		id: "transfer-money",
		title: "Transfer",
		image: transferImage,
	},
	{
		id: "coupons",
		title: "Coupons",
		image: couponImage,
	},
	{
		id: "pay-bill",
		title: "Pay Bill",
		image: payImage,
	},
	{
		id: "transaction-history",
		title: "History",
		image: transactionImage,
	},
];

export { addImage, payImage, outImage, couponImage, transferImage };
