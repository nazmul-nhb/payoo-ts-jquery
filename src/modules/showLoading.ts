import $ from "jquery";

export const setIsLoading = (isLoading: boolean) => {
	if (isLoading) {
		$("#unregistered").hide();
		$("#registered").hide();
		$("#loading-spinner").toggleClass("flex hidden");
	} else {
		$("#registered").show();
		$("#unregistered").show();
		$("#loading-spinner").toggleClass("hidden flex");
	}
};
