#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const pc = require('picocolors');

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
	if (err) {
		console.log(err);
	};

	const statPromises = filenames.map(filename => {
		return lstat(path.join(targetDir, filename));
	});

	const allStats = await Promise.all(statPromises);

	allStats.forEach((stats, index) => {
		if (stats.isFile()) {
			console.log(filenames[index]);
		} else {
			console.log(pc.blue(filenames[index]));
		};
	});
});

const lstat = filename => {
	return new Promise((resolve, reject) => {
		fs.lstat(filename, (err, stats) => {
			if (err) {
				reject(err);
			};

			resolve(stats);
		});
	});
};