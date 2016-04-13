#!/usr/bin/env node
'use strict';
const meow = require('meow');
const logSymbols = require('log-symbols');
const hiddenFiles = require('./');

const cli = meow(`
	Usage
	  $ hidden-files
	  $ hidden-files show
	  $ hidden-files hide
`);

if (!cli.input.length) {
	return hiddenFiles.isShown()
		.then(state => {
			console.log(state ? `${logSymbols.success} Shown` : `${logSymbols.error} Hidden`);
			process.exit(state ? 1 : 0);
		})
		.catch(err => {
			console.error(err);
			process.exit(3);
		});
}

if (cli.input[0] !== 'show' && cli.input[0] !== 'hide') {
	console.log(cli.help);
	process.exit(3);
}

const state = cli.input[0] === 'show';

hiddenFiles.toggle(state)
	.then(() => {
		console.log(state ? `${logSymbols.success} Shown` : `${logSymbols.error} Hidden`);
		process.exit(state ? 1 : 0);
	})
	.catch(err => {
		console.error(err);
		process.exit(3);
	});
