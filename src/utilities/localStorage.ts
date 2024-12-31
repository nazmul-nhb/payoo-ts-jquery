/**
 * Get item(s) from local storage.
 * @param key - Key to get item/items from local storage
 * @returns Returns and array of saved items from local storage with that key
 */
export const getFromLocalStorage = <T>(key: string): T[] => {
	const item = localStorage.getItem(key);

	return JSON.parse(item || "[]") as T[];
};

/**
 * Save item(s) in local storage.
 * @param key - Key to save an item/items
 * @param value - The item/value to save
 */
export const saveToLocalStorage = <T>(key: string, value: T): void => {
	const item = getFromLocalStorage<T>(key);

	const updatedItem = [...item, value];

	localStorage.setItem(key, JSON.stringify(updatedItem));
};
