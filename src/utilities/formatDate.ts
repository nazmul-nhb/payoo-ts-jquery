import dayjs from "dayjs";

export const formatDateWithTime = (date: string | Date): string => {
	return dayjs(date).format("ddd, MMM DD, YYYY | hh:mm:ssa");
};

export const formatDateOnly = (date: string | Date): string => {
	return dayjs(date).format("dddd, MMMM DD, YYYY");
};

export const formatTimeOnly = (date: string | Date): string => {
	return dayjs(date).format("hh:mm:ssa");
};
