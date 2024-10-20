import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import $ from "jquery";
import { notify } from "./utilities/notify";
import { handleLogin } from "./modules/loginForm";

$(() => {
	$("#log-out").on("click", () => {
		notify.error("Clicked Log Out!");
	});

	$("#login-btn").on("click", (e) => handleLogin(e));

	// Footer Year
	$("#year").text(new Date().getFullYear());
});
