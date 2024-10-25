import "./style.css";
import $ from "jquery";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { getCurrentUser } from "./utilities/userMethods";
import { loadAuthScreen } from "./modules/loadAuthIScreen";
import { loadUserFunctionalities } from "./modules/loadFunctionalities";

$(() => {
	// Load current user if already logged in
	const user = getCurrentUser();

	if (user) {
		// Load all user related UI and functionalities
		loadUserFunctionalities(user);
	} else {
		// Load Login/Register Screen
		loadAuthScreen();
	}
});
