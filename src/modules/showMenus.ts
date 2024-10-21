import $ from "jquery";
import { menus } from "../utilities/menus";

export const showMenus = (): void => {
	const menuContainer = $("#menus");

	menuContainer.html("");

	menus.forEach((menu) => {
		const { id, title, image } = menu;

		const menuDiv = $("<div></div>");

		menuDiv.html(
			/*html*/
			`
            <figure id="menu-${id}">
                <image src="${image}" alt="${title}"/>
                <h3>
                    ${title}
                </h3>
            </figure>
            `
		);

		menuContainer.append(menuDiv);
	});
};
