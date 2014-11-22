dotfun
======

Simple JSON dotfile implementation for node.js


### Usage ###

```javascript
var config = require('dotfile')('.mylocalrc');

config.set('something', 'configurable');
config.set('another', { key: 'value' });

config.get();
config.get('something');
```


If you want to set/get a dotfile from the user dir:

```javascript
var config = require('dotfile')('.myuserrc', { home: true });
...
```