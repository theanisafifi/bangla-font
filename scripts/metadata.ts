import * as fs from 'fs';
import stringify from 'json-stringify-pretty-compact';
import { HixbeFontTypes, getDirectories } from './utils';

interface AxesData {
	[axis: string]: {
		min: string;
		max: string;
		default: string;
		step: string;
	};
}

interface LicenseData {
	type: string;
	url: string;
	attribution: string;
}
interface HixbeMetadata {
	id: string;
	family: string;
	subsets: string[];
	weights: number[];
	styles: string[];
	defSubset: string;
	variable: false | AxesData;
	lastModified: string;
	version: string;
	category: string;
	license: LicenseData;
	source: string;
	type: 'google' | 'other';

	npmVersion: string;
	unicodeRange: {
		[subset: string]: string;
	};
}

const hixbeMetadata: Record<string, HixbeMetadata> = {};

// We want to iterate over all fonts and read their metadata and write it to an object
const createMetadata = (type: HixbeFontTypes) => {
	const directories = getDirectories(type);

	for (const directory of directories) {
		const fontDir = `./fonts/${type}/${directory}`;

		const metadata = JSON.parse(
			fs.readFileSync(`${fontDir}/metadata.json`, 'utf8')
		) as Omit<HixbeMetadata, 'npmVersion' | 'unicodeRange'>;

		const unicodeRange = JSON.parse(
			fs.readFileSync(`${fontDir}/unicode.json`, 'utf8')
		) as HixbeMetadata['unicodeRange'];

		const npmVersion = JSON.parse(
			fs.readFileSync(`${fontDir}/package.json`, 'utf8')
		).version as string;

		hixbeMetadata[metadata.id] = {
			...metadata,
			npmVersion,
			unicodeRange,
		};
	}
};

createMetadata('google');
createMetadata('icons');
createMetadata('variable');
createMetadata('variable-icons');
createMetadata('other');

// Sort keys alphabetically
const orderedMetadata: Record<string, HixbeMetadata> = {};
const orderedKeys = Object.keys(hixbeMetadata).sort();

for (const key of orderedKeys) {
	orderedMetadata[key] = hixbeMetadata[key];
}

fs.writeFileSync('metadata/hixbe.json', stringify(orderedMetadata));
