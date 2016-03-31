'use strict';
var execFile = require('child_process').execFile;
var fkill = require('fkill');

exports.isShown = function (cb) {
	if (process.platform !== 'darwin') {
		throw new Error('Only OS X systems are supported');
	}

	var cmd = 'defaults';
	var args = [
		'read',
		'com.apple.finder',
		'AppleShowAllFiles'
	];

	execFile(cmd, args, function (err, res) {
		if (err) {
			cb(err);
			return;
		}
		
		res = res.trim().toLowerCase();
		cb(null, res === 'true' || res === 'yes');
	});
};

exports.show = function (cb) {
	if (process.platform !== 'darwin') {
		throw new Error('Only OS X systems are supported');
	}

	var cmd = 'defaults';
	var args = [
		'write',
		'com.apple.finder',
		'AppleShowAllFiles',
		'true'
	];

	execFile(cmd, args, function (err) {
		if (err) {
			cb(err);
			return;
		}

		fkill('Finder', function (err) {
			if (err) {
				cb(err);
				return;
			}

			cb();
		});
	});
};

exports.hide = function (cb) {
	if (process.platform !== 'darwin') {
		throw new Error('Only OS X systems are supported');
	}

	var cmd = 'defaults';
	var args = [
		'write',
		'com.apple.finder',
		'AppleShowAllFiles',
		'false'
	];

	execFile(cmd, args, function (err) {
		if (err) {
			cb(err);
			return;
		}

		fkill('Finder', function (err) {
			if (err) {
				cb(err);
				return;
			}

			cb();
		});
	});
};

exports.toggle = function (force, cb) {
	if (typeof force === 'function' && typeof cb !== 'function') {
		cb = force;
	}

	if (force === true) {
		exports.show(cb);
		return;
	} else if (force === false) {
		exports.hide(cb);
		return;
	}

	exports.isShown(function (err, res) {
		if (err) {
			cb(err);
			return;
		}

		if (res === true) {
			exports.hide(cb);
		} else {
			exports.show(cb);
		}
	});
};
