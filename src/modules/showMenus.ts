import $ from "jquery";
import { menus } from "../utilities/menus";

export const showMenus = (): void => {
	const menuContainer = $("#menus");

	menuContainer.html("");

	let activeId: string | null = null;

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
                    <h3 class="flex-grow">
                        ${title}
                    </h3>
            </figure>
            `
		);

		menuContainer.append(menuDiv);

		// Handle click event for the current menu item
		$(`#menu-${id}`).on("click", () => {
			// If there's an active menu, remove the active classes and add the inactive classes
			if (activeId !== null) {
				$(`#menu-${activeId}`).toggleClass(
					"bg-payoo/90 text-white hover:text-payoo bg-payoo/5 text-payoo"
				);

				$(`#${activeId}-section`).hide();
				$(`#${id}-section`).show();
			}

			// Set the clicked menu as active
			activeId = id;

			// Toggle the classes for the clicked menu item
			$(`#menu-${id}`).toggleClass(
				"bg-payoo/90 text-white hover:text-payoo bg-payoo/5 text-payoo"
			);
			console.log({ id, activeMenuId: activeId });
		});
	});
};
