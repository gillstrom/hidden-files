#!/usr/bin/env node
'use strict';
var meow = require('meow');
var logSymbols = require('log-symbols');
var hiddenFiles = require('./');

var cli = meow({
	help: [
		'Usage',
		'  $ hidden-files',
		'  $ hidden-files show',
		'  $ hidden-files hide'
	]
});

if (!cli.input.length) {
	hiddenFiles.isShown(function (err, state) {
		if (err) {
			console.error(err.message);
			process.exit(3);
		}

		console.log(state ? logSymbols.success + ' Shown' : logSymbols.error + ' Hidden');
		process.exit(state ? 1 : 0);
	});

	return;
}

if (cli.input[0] !== 'show' && cli.input[0] !== 'hide') {
	console.log(cli.help);
	process.exit(3);
}

var state = cli.input[0] === 'show' ? true : false;

hiddenFiles.toggle(state, function (err) {
	if (err) {
		console.error(err.message);
		process.exit(3);
	}

	console.log(state ? logSymbols.success + ' Shown' : logSymbols.error + ' Hidden');
	process.exit(state ? 1 : 0);
});
