import $ from "jquery";
import { handleLogin } from "./loginForm";
import { handleRegister } from "./registerForm";
import { toggleButtonState, toggleTabs } from "./tabsToggler";

/** Load login/register screen */
export const loadAuthScreen = (): void => {
	// Show Login Form (Tab)
	$("#login-tab").off("click").on("click", () => {
		toggleTabs($("#login-form"), $("#register-form"));
		toggleButtonState($("#login-tab"), $("#register-tab"));
	});

	// Show Register Form (Tab)
	$("#register-tab").off("click").on("click", () => {
		toggleTabs($("#register-form"), $("#login-form"));
		toggleButtonState($("#register-tab"), $("#login-tab"));
	});

	// Login button in the form
	$("#login-btn").off("click").on("click", (e) => handleLogin(e));
	// Register button in the form
	$("#register-btn").off("click").on("click", (e) => handleRegister(e));
};
