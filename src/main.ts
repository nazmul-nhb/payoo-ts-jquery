import "./style.css";
import $ from "jquery";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { handleLogin } from "./modules/loginForm";
import { toggleButtonState, toggleTabs } from "./modules/tabsToggler";
import { handleRegister } from "./modules/registerForm";
import { getCurrentUser, logOut } from "./utilities/userMethods";
import { showLoginScreen, showMainScreen } from "./modules/toggleScreens";
import { showMenus } from "./modules/showMenus";
import { handleAddMoney } from "./modules/addMoney";
import { showBalance } from "./modules/showBalance";
// import { setIsLoading } from "./modules/showLoading";

$(() => {
	// setIsLoading(true);
	// Load current user if already logged in
	const user = getCurrentUser();

	if (user) {
		showMainScreen();
		showBalance(user.getBalance());
	} else {
		showLoginScreen();
	}

	showMenus();

	// setIsLoading(false);

	// Logout button in the header section
	$("#log-out").on("click", () => {
		logOut();
		showLoginScreen();
	});

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

	// Add Money Button
	$("#add-money-btn").on("click", (e) => handleAddMoney(e));

	// Footer Year
	$("#year").text(new Date().getFullYear());
});
