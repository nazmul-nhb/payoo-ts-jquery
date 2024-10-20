export const getItemFromLocalStorage = (key: string): [] => {
	const item = localStorage.getItem(key);
	// if (item) {
	// 	return JSON.parse(item);
	// }
    // return [];
    
    return JSON.parse(item || "[]");
};
