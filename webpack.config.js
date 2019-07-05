// External modules
const path	= require('path'); // Плагин для упрощения работы с путями
const merge	= require('webpack-merge');

//
var folder = path.join(__dirname);	// Переменная, хранящая абсолютный путь до рабочего каталога

// Local modules
const base		= require(folder + "/webpackAdds/base.js");
const babel		= require(folder + "/webpackAdds/babel.js");
const pug		= require(folder + "/webpackAdds/pug.js");
const stylus	= require(folder + "/webpackAdds/stylus.js");
const static	= require(folder + "/webpackAdds/static.js");
const aliases	= require(folder + "/webpackAdds/aliases.js");

// Configuration
module.exports = function() {
	return merge([
		base({base: folder}),
		babel(),
		pug({base: folder}),
		stylus(),
		static(),
		aliases({base: folder})
	])
}

// -whiteGloom
