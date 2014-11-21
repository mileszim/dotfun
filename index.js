/** Dependencies */
var path = require('path');
var fs   = require('fs');
var util = require('util');



/**
 * Dotfun
 *
 * @constructor
 * @param {string} name - dotfile name
 * @param {object} options
 */
var Dotfun = function(name, options) {
	if (!(this instanceof Dotfun)) return new Dotfun(name, options);
	
	// Sanitize name
	this.name = Dotfun._sanitize(name);
	
	// Home dir
	if (!options || options.home) {
		this.path = path.join(Dotfun._home(), Dotfun._sanitize(name));
	} else
	
	// Local/working directory
	if (options.local || options.working) {
		this.path = path.join(process.cwd(), Dotfun._sanitize(name));
	}
	
	// Load config
	process.nextTick(function() {
		this.config = Dotfun._load(this.path);
	}.bind(this));
};



Dotfun.prototype = {
	
	/**
	 * Get config
	 */
	get: function() {

	},
	
	
	/**
	 * Set config
	 */
	set: function(config) {
		fs.writeFileSync(this.path, JSON.stringify(config, null, 2) + '\n');
	}
	
};



/**
 * Home Dir
 */
Dotfun._home = function() {
	var root;
	if (process.platform === 'win32') {
	  root = process.env.USERPROFILE
	  || process.env.APPDATA
	  || process.env.TMP
	  || process.env.TEMP;
	} else {
	  root = process.env.HOME
	  || process.env.TMPDIR
	  || '/tmp';
	}
	return root;
}


/** 
 * Sanitize Name
 */
Dotfun._sanitize = function(name) {
	if (name[0] !== '.') name = '.' + name;
	return name;
};


/**
 * Load JSON
 */
Dotfun._load = function(path) {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  } catch (err) {
    return {};
  }
}


/** Export */
module.exports = Dotfun;