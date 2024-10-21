import $ from "jquery";

export const showMainScreen = (): void => {
	$("#unregistered").hide();
	$("#registered").show();
};

export const showLoginScreen = (): void => {
	$("#unregistered").show();
	$("#registered").hide();
};
