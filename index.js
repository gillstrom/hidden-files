'use strict';
const execa = require('execa');
const fkill = require('fkill');

exports.isShown = () => {
	if (process.platform !== 'darwin') {
		throw new Error('Only OS X systems are supported');
	}

	const cmd = 'defaults';
	const args = [
		'read',
		'com.apple.finder',
		'AppleShowAllFiles'
	];

	return execa(cmd, args).then(res => {
		const ret = res.stdout.trim().toLowerCase();
		return ret === 'true' || ret === 'yes';
	});
};

exports.show = () => {
	if (process.platform !== 'darwin') {
		throw new Error('Only OS X systems are supported');
	}

	const cmd = 'defaults';
	const args = [
		'write',
		'com.apple.finder',
		'AppleShowAllFiles',
		'true'
	];

	return execa(cmd, args).then(() => fkill('Finder'));
};

exports.hide = () => {
	if (process.platform !== 'darwin') {
		throw new Error('Only OS X systems are supported');
	}

	const cmd = 'defaults';
	const args = [
		'write',
		'com.apple.finder',
		'AppleShowAllFiles',
		'false'
	];

	return execa(cmd, args).then(() => fkill('Finder'));
};

exports.toggle = force => {
	if (force === true) {
		return exports.show();
	} else if (force === false) {
		return exports.hide();
	}

	return exports.isShown().then(shown => shown ? exports.hide() : exports.show());
};
