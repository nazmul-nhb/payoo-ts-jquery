import $ from "jquery";

/** Show main screen */
export const showMainScreen = (): void => {
	$("#unregistered").hide();
	$("#registered").show();
};

/** Show Login screen */
export const showLoginScreen = (): void => {
	$("#unregistered").show();
	$("#registered").hide();
};
