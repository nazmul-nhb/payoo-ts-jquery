import "./style.css";
import $ from "jquery";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { getCurrentUser } from "./utilities/userMethods";
import { showLoginScreen } from "./modules/toggleScreens";
import { loadUserFunctionalities } from "./modules/loadFunctionalities";
import { loadAuthScreen } from "./modules/loadAuthIScreen";

$(() => {
	// Load current user if already logged in
	const user = getCurrentUser();

	if (user) {
		// Load all user related UI and functionalities
		loadUserFunctionalities(user);
	} else {
		// Load Login/Register Screen
		showLoginScreen();
	}

	// Load Login/Register Elements
	loadAuthScreen();
});
