import $ from "jquery";
import type { NotyfNotification } from "notyf";
import { notify } from "../utilities/notify";
import { getCurrentUser } from "../utilities/userMethods";
import { showBalance } from "./showBalance";
import { coupons } from "../utilities/coupons";

/**
 * Handle coupon selection.
 * @param e Click event.
 */
export const handleCoupons = (e: JQuery.ClickEvent): NotyfNotification => {
	e.preventDefault();

	try {
		const user = getCurrentUser();

		if (!user) {
			return notify.error("User Not Found!");
		}

		const coupon = ($("#coupon-code").val() as string).trim();

		if (!coupon.length) {
			return notify.error("Enter A Coupon!");
		}

		const selectedCoupon = coupons.find((cpn) => cpn.name === coupon);

		if (selectedCoupon) {
			const result = user.redeemCoupon({
				coupon,
				amount: selectedCoupon.amount,
			});

			if (result.success) {
				$("#coupon-form input").val("");

				const updatedUser = getCurrentUser();

				updatedUser && showBalance(updatedUser.balance);

				return notify.success(`Redeemed $${selectedCoupon.amount}!`);
			} else {
				return notify.error(result.message);
			}
		}
		return notify.error("Invalid Coupon!");
	} catch (error) {
		if (error instanceof Error) {
			return notify.error(error.message);
		}

		return notify.error("Something went wrong!");
	}
};
