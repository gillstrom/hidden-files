import delay from 'timeout-as-promise';
import test from 'ava';
import fn from './';

if (process.env.CI) {
	test(t => t.pass());
} else {
	test('isShown', async t => {
		t.is(typeof await fn.isShown(), 'boolean');
	});

	test.serial('hide()', async t => {
		await fn.hide();
		t.false(await fn.isShown());
	});

	test.serial('show()', async t => {
		await delay(3000);
		await fn.show();
		t.true(await fn.isShown());
	});

	test.serial('toggle()', async t => {
		await delay(3000);
		await fn.toggle();
		t.false(await fn.isShown());
	});
}
