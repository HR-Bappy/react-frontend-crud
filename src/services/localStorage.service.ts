
export const isBrowser = typeof window !== "undefined";
export const isServer = false;

export const LocalStorageService = {
	set: (key: string, value: any): void =>
		localStorage?.setItem(key, JSON.stringify(value)),
	get: (key: string): string | null => {
		let res: any;
		if (isBrowser) res = localStorage?.getItem(key);
		if (res === undefined || res === null) return null;
		return JSON.parse(res);
	},
	delete: (key: string): void => localStorage?.removeItem(key),
	clear: (): void => localStorage?.clear(),
};