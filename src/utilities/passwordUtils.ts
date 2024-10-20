import bcrypt from "bcryptjs";

export const hashPassword = async (
	password: string
): Promise<string | null> => {
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		return hashedPassword;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const matchPassword = async (
	password: string,
	storedPassword: string
): Promise<boolean> => {
	try {
		const isMatched = await bcrypt.compare(password, storedPassword);
		return isMatched;
	} catch (error) {
		console.error(error);
		return false;
	}
};
