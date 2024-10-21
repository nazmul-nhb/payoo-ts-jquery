import $ from "jquery";

export const showBalance = (amount: number): void => {
	$("#balance").text(amount);
};
