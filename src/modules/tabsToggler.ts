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
