import "./style.css";
import $ from "jquery";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { handleLogin } from "./modules/loginForm";
import { toggleButtonState, toggleTabs } from "./modules/tabsToggler";
import { handleRegister } from "./modules/registerForm";
import { getCurrentUser, logOut } from "./utilities/userMethods";
import { showLoginScreen, showMainScreen } from "./modules/toggleScreens";
import { showMenus } from "./modules/showMenus";
import { showBalance } from "./modules/showBalance";
import { handleTransaction } from "./modules/handleTransaction";
import type { IAddMoneyInput, IPayBillInput } from "./types/interfaces";
// import { setIsLoading } from "./modules/showLoading";

$(() => {
	// setIsLoading(true);
	// Load current user if already logged in
	const user = getCurrentUser();

	if (user) {
		showMainScreen();
		showBalance(user.getBalance());
		showMenus(user.mobile);

		// setIsLoading(false);

		// Logout button in the header section
		$("#log-out").on("click", () => {
			logOut();
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

		// Button to take home from Error Screen
		$("#error-handler").on("click", () => {
			history.pushState(null, "", "/");
			$("#not-found").addClass("hidden");
			$("#not-found").removeClass("flex");
		});
	} else {
		showLoginScreen();
	}

	// Show Login Form (Tab)
	$("#login-tab").on("click", () => {
		toggleTabs($("#login-form"), $("#register-form"));
		toggleButtonState($("#login-tab"), $("#register-tab"));
	});

	// Show Register Form (Tab)
	$("#register-tab").on("click", () => {
		toggleTabs($("#register-form"), $("#login-form"));
		toggleButtonState($("#register-tab"), $("#login-tab"));
	});

	// Login button in the form
	$("#login-btn").on("click", (e) => handleLogin(e));
	// Register button in the form
	$("#register-btn").on("click", (e) => handleRegister(e));

	// Footer Year
	$("#year").text(new Date().getFullYear());
});
