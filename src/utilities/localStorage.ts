export const getFromLocalStorage = <T>(key: string): T[] => {
	const item = localStorage.getItem(key);

	return JSON.parse(item || "[]") as T[];
};

export const saveToLocalStorage = <T>(key: string, value: T): void => {
	const item = getFromLocalStorage<T>(key);

	item.push(value);

	const updatedItem = JSON.stringify(item);

	localStorage.setItem(key, updatedItem);
};
