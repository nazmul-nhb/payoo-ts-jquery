import $ from "jquery";

/**
 * Show balance on top-left of the screen.
 * @param amount Amount to show in number.
 */
export const showBalance = (amount: number): void => {
	$("#balance").text(amount);
};
