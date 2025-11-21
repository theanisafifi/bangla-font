import fs from 'node:fs';

export const HIXBE_FONT_TYPES = [
	'google',
	'icons',
	'variable',
	'variable-icons',
	'other',
] as const;

export type HixbeFontTypes = (typeof HIXBE_FONT_TYPES)[number];

export const getDirectories = (type: string) => {
	try {
		return fs
			.readdirSync(`./fonts/${type}`, { withFileTypes: true })
			.filter((dirent) => dirent.isDirectory())
			.map((dirent) => dirent.name);
	} catch {
		return [];
	}
};
