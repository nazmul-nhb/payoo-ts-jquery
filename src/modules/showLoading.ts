import $ from "jquery";

export const setIsLoading = (isLoading: boolean) => {
	if (isLoading) {
		$("#unregistered").hide();
		$("#registered").hide();
		$("#main-container").hide();
		$("#main").addClass("flex items-center justify-center");
		$("#loading-spinner").show();
	} else {
		$("#registered").show();
		$("#unregistered").show();
		$("#main-container").show();
		$("#main").removeClass("flex items-center justify-center");
		$("#loading-spinner").hide();
	}
};
