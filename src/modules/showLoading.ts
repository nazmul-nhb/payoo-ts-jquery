import $ from "jquery";
import { getCurrentUser } from "../utilities/userMethods";

/**
 * Set loading state.
 * @param isLoading Boolean flag `true` or `false`
 */
export const setIsLoading = (isLoading: boolean) => {
	if (isLoading) {
		$("#unregistered").hide();
		$("#registered").hide();
		$("#main-container").hide();
		$("#main").addClass("flex items-center justify-center");
		$("#loading-spinner").show();
	} else {
		$("#main").removeClass("flex items-center justify-center");
		$("#loading-spinner").hide();

		const user = getCurrentUser();

		if (user) {
			$("#registered").show();
			$("#unregistered").hide();
		} else {
			$("#unregistered").show();
			$("#registered").hide();
		}

		$("#main-container").show();
	}
};
