import $ from "jquery";
import { User } from "../classes/User";
import { handleCoupons } from "./handleCoupons";
import { handleTransaction } from "./handleTransaction";
import { updateNotFoundState } from "./handleNotFound";
import type { IAddMoneyInput, IPayBillInput } from "../types/interfaces";
import { showLoginScreen, showMainScreen } from "./toggleScreens";
import { showMenus } from "./showMenus";
import { showBalance } from "./showBalance";

export const loadUserFunctionalities = (user: User): void => {
	showMainScreen();
	showMenus(user.mobile);
	showBalance(user.getBalance());

	// Logout button in the header section
	$("#log-out").on("click", () => {
		user.logOut();
		showLoginScreen();
	});

	// Add Money
	$("#add-money-btn").on("click", (e) =>
		handleTransaction(e, "add-money", (details) =>
			user.addMoney(details as IAddMoneyInput)
		)
	);

	// Cash Out
	$("#cash-out-btn").on("click", (e) =>
		handleTransaction(e, "cash-out", (details) => user.cashOut(details))
	);

	// Transfer
	$("#transfer-btn").on("click", (e) =>
		handleTransaction(e, "transfer", (details) =>
			user.transferMoney(details)
		)
	);

	// Pay Bill
	$("#pay-bill-btn").on("click", (e) =>
		handleTransaction(e, "pay-bill", (details) =>
			user.payBill(details as IPayBillInput)
		)
	);

	// Redeem Coupon
	$("#coupon-btn").on("click", (e) => handleCoupons(e));

	// Button to take home from Error Screen
	$("#error-handler").on("click", () => {
		history.pushState(null, "", "/");
		updateNotFoundState("Welcome - Payoo", false);
		showMenus(user.mobile);
	});

	// Footer Year
	$("#year").text(new Date().getFullYear());
};
