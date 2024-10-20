import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export const notify = new Notyf({
	duration: 2000,
	ripple: true,
	dismissible: true,
	position: {
		x: "right",
		y: "top",
	},
});
