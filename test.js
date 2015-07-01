'use strict';
var test = require('ava');
var hiddenFiles = require('./');

if (!process.env.CI) {
	test('isShown', function (t) {
		t.plan(2);

		hiddenFiles.isShown(function (err, state) {
			t.assert(!err, err);
			t.assert(typeof state === 'boolean');
		});
	});

	test('hide(), show() and toggle()', function (t) {
		t.plan(9);

		hiddenFiles.hide(function (err) {
			t.assert(!err, err);

			hiddenFiles.isShown(function (err, state) {
				t.assert(!err, err);
				t.assert(state === false);

				setTimeout(function () {
					hiddenFiles.show(function (err) {
						t.assert(!err, err);

						hiddenFiles.isShown(function (err, state) {
							t.assert(!err, err);
							t.assert(state === true);

							setTimeout(function () {
								hiddenFiles.toggle(function (err) {
									t.assert(!err, err);

									hiddenFiles.isShown(function (err, state) {
										t.assert(!err, err);
										t.assert(state === false);
									});
								});
							}, 5000);
						});
					});
				}, 5000);
			});
		});
	});
}
