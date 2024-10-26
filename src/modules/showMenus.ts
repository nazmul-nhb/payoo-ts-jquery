import $ from "jquery";
import { menus } from "../utilities/menus";
import { showHistory } from "./showHistory";
import { setActiveSection } from "./setActiveSection";
import { updateNotFoundState } from "./handleNotFound";

export const showMenus = (mobile: string): void => {
	// Load transaction history
	showHistory(mobile);

	const menuContainer = $("#menus");
	menuContainer.html("");

	let activeId: string | null = null;

	// Check if there's URL on page load
	const urlPath = window.location.pathname.split("/").pop();

	let menuItemExists = false;

	if (urlPath) {
		activeId = urlPath;
		setActiveSection(null, activeId);
	}

	menus.forEach((menu) => {
		const { id, title, image } = menu;

		if (urlPath) {
			setActiveSection(activeId, urlPath);
			updateNotFoundState(`${title} - Payoo`, false);
		}

		const menuDiv = $("<div></div>");

		menuDiv.html(
			/*html*/
			`
            <figure
                id="menu-${id}"
                class="flex flex-col items-center gap-2 cursor-pointer border shadow-md shadow-payoo/80 md:px-4 p-2 rounded-lg font-semibold hover:bg-payoo/75 hover:text-white transition-all duration-500 bg-payoo/5 text-payoo"
            >
                <img
                    class="flex-grow"
                    src="${image}"
                    alt="${title}"
                />
                <h3 class="flex-grow text-sm md:text-base text-center">${title}</h3>
            </figure>
            `
		);

		menuContainer.append(menuDiv);

		// Handle click event for the current menu item
		$(`#menu-${id}`)
			.off("click")
			.on("click", () => {
				// Set the clicked menu and corresponding section as active
				setActiveSection(activeId, id);

				$("#menu-contents").show();

				// Load fresh history
				if (id === "transaction-history") {
					showHistory(mobile);
				}

				activeId = id;

				// Update the url in browser address bar
				history.pushState(null, "", `/${id}`);

				updateNotFoundState(`${title} - Payoo`, false);
			});

		// Check if the menu item exists for the current URL path
		if (id === urlPath) {
			menuItemExists = true;
			activeId = urlPath; // Set activeId to the existing menu item
			setActiveSection(null, activeId); // Set the menu & section active
			updateNotFoundState(`${title} - Payoo`, false);
		}
	});

	if (!urlPath) {
		// Handle the empty path case
		updateNotFoundState("Welcome - Payoo", false);
		$("#menu-contents").hide();
	} else {
		// Set active section or show error for invalid path
		activeId = urlPath;
		setActiveSection(null, activeId);

		if (menuItemExists) {
			const menuItem = $(`#menu-${urlPath}`);
			updateNotFoundState(`${menuItem.text()} - Payoo`, false);
		} else {
			updateNotFoundState("Menu Not Found!", true);
		}
	}

	// Handle back/forward navigation based on URL
	window.onpopstate = () => {
		const currentPath = window.location.pathname.split("/").pop();

		if (!currentPath) {
			updateNotFoundState("Welcome - Payoo", false);
			$("#menu-contents").hide();
		} else {
			const currentMenuItem = $(`#menu-${currentPath}`);

			if (currentMenuItem.length) {
				// Set the active menu and section based on the URL
				setActiveSection(activeId, currentPath);
				activeId = currentPath;

				$("#menu-contents").show();

				// Load fresh history
				if (currentPath === "transaction-history") {
					showHistory(mobile);
				}

				updateNotFoundState(`${currentMenuItem.text()} - Payoo`, false);
			} else {
				updateNotFoundState("Menu Not Found!", true);
			}
		}
	};
};
