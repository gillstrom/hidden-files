# hidden-files [![Build Status](https://travis-ci.org/gillstrom/hidden-files.svg?branch=master)](https://travis-ci.org/gillstrom/hidden-files)

> Show or hide hidden files on OS X systems
*Finder is automatically restarted*


## Install

```
$ npm install --save hidden-files
```


## Usage

```js
var hiddenFiles = require('hidden-files');

hiddenFiles.show(function (err) {
	console.log('Hidden files are now shown');
});

hiddenFiles.isShown(function (err, state) {
	console.log(state);
	//=> true
});
```


## CLI

```
$ npm install --global hidden-files
```
```
$ hidden-files --help

  Usage
    $ hidden-files
    $ hidden-files show
    $ hidden-files hide
```


## API

### .isShown(callback)

Check if hidden files are shown or hidden.

### .show(callback)

Show hidden files.

### .hide(callback)

Hide hidden files.

### .toggle([force], callback)

Toggle the hidden files state.

#### force

Type: `boolean`

Force a state when toggling.


## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
