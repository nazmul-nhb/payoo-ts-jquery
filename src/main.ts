import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import $ from "jquery";
import { notify } from "./utilities/notify";

$(() => {
	$("#log-out").on("click", () => {
		notify.error("Clicked Log Out!");
  });
  
  // Footer Year
  $('#year').text((new Date().getFullYear()))
});
