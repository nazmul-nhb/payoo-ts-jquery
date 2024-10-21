import bcrypt from "bcryptjs";

/**
 * Hash a PIN and returns the hashed PIN or nothing if there is any error
 */
export const hashPIN = async (pin: string): Promise<string | null> => {
	try {
		const hashedPIN = await bcrypt.hash(pin, 10);
		return hashedPIN;
	} catch (error) {
		console.error(error);
		return null;
	}
};

/**
 * Match PIN with the stored PIN and returns a boolean
 */
export const matchPIN = async (
	pin: string,
	storedPIN: string
): Promise<boolean> => {
	try {
		const isMatched = await bcrypt.compare(pin, storedPIN);
		return isMatched;
	} catch (error) {
		console.error(error);
		return false;
	}
};
