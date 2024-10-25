import $ from "jquery";
import { handleLogin } from "./loginForm";
import { handleRegister } from "./registerForm";
import { toggleButtonState, toggleTabs } from "./tabsToggler";

export const loadAuthScreen = (): void => {
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
};
