import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import $ from "jquery";
import { notify } from "./utilities/notify";
import { handleLogin } from "./modules/loginForm";
import { toggleButtonState, toggleTabs } from "./modules/tabsToggler";
import { handleRegister } from "./modules/registerForm";

$(() => {
	// Logout button in the header section
	$("#log-out").on("click", () => {
		notify.error("Clicked Log Out!");
		$("#unregistered").show();
		$("#registered").hide();
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

	// Footer Year
	$("#year").text(new Date().getFullYear());
});
