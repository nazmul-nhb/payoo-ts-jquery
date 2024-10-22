import $ from "jquery";
import { menus } from "../utilities/menus";
import { setActiveSection } from "./setActiveSection";

export const showMenus = (): void => {
	const menuContainer = $("#menus");
	menuContainer.html("");

	let activeId: string | null = null;

	// Check if there's an ID in the URL on page load
	const urlPath = window.location.pathname.split("/").pop();
	console.log({ urlPath });

	if (urlPath) {
		// activeId = urlPath;
		setActiveSection(activeId, urlPath);
	}

	menus.forEach((menu) => {
		const { id, title, image } = menu;

		const menuDiv = $("<div></div>");
		menuDiv.html(
			/*html*/
			`
            <figure
                id="menu-${id}"
                class="flex flex-col items-center gap-2 cursor-pointer border border-payoo/75 px-4 py-2 rounded-lg font-semibold hover:bg-payoo/20 transition-all duration-500 bg-payoo/5 text-payoo"
            >
                <img
                    class="flex-grow"
                    src="${image}"
                    alt="${title}"
                />
                <h3 class="flex-grow">${title}</h3>
            </figure>
            `
		);

		menuContainer.append(menuDiv);

		// Handle click event for the current menu item
		$(`#menu-${id}`).on("click", () => {
			// Set the clicked menu as active
			setActiveSection(activeId, id);

			activeId = id;

			// Update the browser's URL without reloading the page
			history.pushState(null, "", `/${id}`); // This updates the URL
		});
	});

	// Handle back/forward navigation based on URL
	window.onpopstate = () => {
		const currentPath = window.location.pathname.split("/").pop();

		if (currentPath && $(`#menu-${currentPath}`).length) {
			// Set the active menu and section based on the URL
			setActiveSection(activeId, currentPath);

			activeId = currentPath;
		}
	};
};
