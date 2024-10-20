import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export const notify = new Notyf({
	duration: 2500,
	ripple: true,
	dismissible: true,
	position: {
		x: "right",
		y: "top",
	},
});
