import $ from "jquery";

/**
 * Updates the document title and toggles the visibility of the `Not Found` Screen.
 *
 * @param title - String - The title to set for the document.
 * @param showNotFound - Boolean - Determines whether the `Not Found` Screen should be visible.
 */
export const updateNotFoundState = (
	title: string,
	showNotFound: boolean
): void => {
    document.title = title;
    
	$("#not-found")
		.toggleClass("flex", showNotFound)
        .toggleClass("hidden", !showNotFound);
    
	if (showNotFound) {
		$("#menus").html("");
	}
};
