export const getFromLocalStorage = <Value>(key: string): Value[] => {
	const item = localStorage.getItem(key);

	return JSON.parse(item || "[]") as Value[];
};

export const saveToLocalStorage = <Value>(key: string, value: Value): void => {
	const item = getFromLocalStorage<Value>(key);

	item.push(value);

	const updatedItem = JSON.stringify(item);

	localStorage.setItem(key, updatedItem);
};
