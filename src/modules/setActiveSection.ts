import $ from "jquery";

export const setActiveSection = (
	toHide: string | null,
	toShow: string
): void => {
	console.log({ toHide });

	if (toHide) {
		// Remove the active styles from the previously active menu and hide the section
		$(`#menu-${toHide}`)
			.removeClass("bg-payoo/90 text-white hover:text-payoo")
			.addClass("bg-payoo/5 text-payoo");

		$(`#${toHide}-section`).hide();
	}

	// Update the toHide variable to the new active ID
	toHide = toShow;

	console.log({ toShow, toHide });

	// Add the active styles to the newly clicked menu and show the section
	$(`#menu-${toShow}`)
		.addClass("bg-payoo/90 text-white hover:text-payoo")
		.removeClass("bg-payoo/5 text-payoo");

	$(`#${toShow}-section`).show();
};
