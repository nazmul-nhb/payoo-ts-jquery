import "./style.css";
import $ from "jquery";
import { notify } from "./utilities/notify";

$(() => {
	$("#jQb").on("click", () => {
		notify.error("Button Clicked!");
	});
});
