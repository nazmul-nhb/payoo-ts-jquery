/**
 * Toggle tabs states: hide/show.
 * @param tabToShow The tab to show.
 * @param tabToHide The tab to hide.
 */
export const toggleTabs = (
	tabToShow: JQuery<HTMLElement>,
	tabToHide: JQuery<HTMLElement>
) => {
	if (tabToShow && tabToHide) {
		tabToShow.removeClass("hidden");
		tabToShow.addClass("flex");
		tabToHide.removeClass("flex");
		tabToHide.addClass("hidden");
	}
};

/**
 * Toggle Button colors and other states.
 * @param activeButton Current active button.
 * @param inactiveButton Current inactive button.
 */
export const toggleButtonState = (
	activeButton: JQuery<HTMLElement>,
	inactiveButton: JQuery<HTMLElement>
) => {
	if (activeButton && inactiveButton) {
		activeButton.addClass("active-tab-btn");
		activeButton.removeClass("inactive-tab-btn");
		inactiveButton.addClass("inactive-tab-btn");
		inactiveButton.removeClass("active-tab-btn");
	}
};
