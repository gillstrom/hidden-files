# hidden-files [![Build Status](https://travis-ci.org/gillstrom/hidden-files.svg?branch=master)](https://travis-ci.org/gillstrom/hidden-files)

> Show or hide hidden files on OS X systems.

*Finder is automatically restarted*


## Install

```
$ npm install --save hidden-files
```


## Usage

```js
const hiddenFiles = require('hidden-files');

hiddenFiles.show().then(() => {
	console.log('Hidden files are now shown');
});

hiddenFiles.isShown().then(state => {
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

### .isShown()

Check if hidden files are shown or hidden.

### .show()

Show hidden files.

### .hide()

Hide hidden files.

### .toggle([force])

Toggle the hidden files state.

#### force

Type: `boolean`

Force a state when toggling.


## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
