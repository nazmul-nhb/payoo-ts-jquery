import $ from "jquery";
import { menus } from "../utilities/menus";
import { setActiveSection } from "./setActiveSection";

export const showMenus = (): void => {
	const menuContainer = $("#menus");
	menuContainer.html("");

	let activeId: string | null = null;

	// Check if there's an ID in the URL on page load
	const urlPath = window.location.pathname.split("/").pop();

	let menuItemExists = false;

	if (urlPath) {
		activeId = urlPath;
		setActiveSection(null, activeId);
	}

	if (urlPath === "") {
		document.title = "Welcome - Payoo";
		$("#not-found").addClass("hidden");
		$("#not-found").removeClass("flex");
	}

	menus.forEach((menu) => {
		const { id, title, image } = menu;

		if (urlPath) {
			setActiveSection(activeId, urlPath);
			document.title = `${title} - Payoo`;
		}

		const menuDiv = $("<div></div>");
		menuDiv.html(
			/*html*/
			`
            <figure
                id="menu-${id}"
                class="flex flex-col items-center gap-2 cursor-pointer border border-payoo/75 md:px-4 p-2 rounded-lg font-semibold hover:bg-payoo/20 transition-all duration-500 bg-payoo/5 text-payoo"
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
		$(`#menu-${id}`).on("click", () => {
			// Set the clicked menu and corresponding section as active
			setActiveSection(activeId, id);

			activeId = id;

			// Update the url in browser address bar
			history.pushState(null, "", `/${id}`);

			// Update the document title and hide the not-found message
			document.title = `${title} - Payoo`;
			$("#not-found").addClass("hidden");
			$("#not-found").removeClass("flex");
		});

		// Check if the menu item exists for the current URL path
		if (id === urlPath) {
			menuItemExists = true;
			activeId = urlPath; // Set activeId to the existing menu item
			setActiveSection(null, activeId); // Set the menu & section active
		}
	});

	// Set the document title based on the active menu if urlPath exists
	if (urlPath) {
		if (menuItemExists) {
			const menuItem = $(`#menu-${urlPath}`);
			document.title = `${menuItem.text().trim()} - Payoo`;
			$("#not-found").addClass("hidden");
			$("#not-found").removeClass("flex");
		} else {
			document.title = "Menu Not Found!";
			$("#not-found").addClass("flex");
			$("#not-found").removeClass("hidden");
		}
	}

	// Handle back/forward navigation based on URL
	window.onpopstate = () => {
		const currentPath = window.location.pathname.split("/").pop();

		if (currentPath) {
			const currentMenuItem = $(`#menu-${currentPath}`);
			if (currentMenuItem.length) {
				// Set the active menu and section based on the URL
				setActiveSection(activeId, currentPath);
				activeId = currentPath;

				// Update the document title
				document.title = `${currentMenuItem.text().trim()} - Payoo`;
				$("#not-found").addClass("hidden");
				$("#not-found").removeClass("flex");
			} else {
				document.title = "Menu Not Found!";
				$("#not-found").addClass("flex");
				$("#not-found").removeClass("hidden");
			}
		}
	};
};
