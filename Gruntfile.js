'use strict';

var LIVERELOAD_PORT = 35729,
	lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT}),
	fs = require('fs'),
	mountFolder = function (connect, dir) {
		return connect.static(require('path').resolve(dir));
	};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function (grunt) {
	var gruntConfig,
		games = fs.readdirSync('src');

	// show elapsed time at the end
	require('time-grunt')(grunt);
	// load all grunt tasks
	require('load-grunt-tasks')(grunt);

	gruntConfig = {
		watch: {
			options: {
				livereload: true
			},
			html: {
				files: ['src/**/*.htm*']
			},
			js: {
				files: ['src/**/*.js'],
				tasks: ['jshint']
			},
			compass: {
				options: {
					livereload: false
				},
				files: ['src/**/*.scss'],
				tasks: ['compass']
			},
			css: {
				files: ['src/**/*.css'],
				tasks: []
			},
			mustache: {
				files: ['src/**/*.mustache']
			}
		},
		connect: {
			options: {
				port: 9000,
				hostname: 'localhost'
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: ['src/**/*.js']
		},
		open: {},
		requirejs: {}
	};

	// Require JS
	gruntConfig.requirejs['BigBoard'] = {
		options: {
			baseUrl: 'src',
			mainConfigFile: 'src/js/main.js',
			include: ['js/lib/almond/almond', 'js/main'],
			wrap: true,
			out: 'build/main.js'
		}
	};
	// Open
	gruntConfig.open['dev-BigBoard'] = {
		path: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>/index.htm'
	};
	gruntConfig.open['dist-BigBoard'] = {
		path: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>/index.htm'
	};
	// Connect server
	gruntConfig.connect['dev-BigBoard'] = {
		options: {
			middleware: function (connect) {
				return [
					lrSnippet,
					mountFolder(connect, './src/')
				];
			}
		}
	};
	gruntConfig.connect['dist-BigBoard'] = {
		options: {
			middleware: function (connect) {
				return [
					mountFolder(connect, './build/')
				];
			}
		}
	};

	grunt.initConfig(gruntConfig);

	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.registerTask('server', function (game, target) {
		if (target === 'dist') {
			grunt.task.run([
				'jshint',
				'build:BigBoard',
				'open:dist-BigBoard',
				'connect:dist-BigBoard:keepalive'
			]);
		// Dev
		} else {
			grunt.task.run([
				'jshint',
				'connect:dev-BigBoard',
				'open:dev-BigBoard',
				'watch'
			]);
		}
	});

	grunt.registerTask('build', function (game) {
		grunt.task.run([
			'requirejs: BigBoard'
		]);
	});

	grunt.registerTask('default', [
		'jshint',
		'build'
	]);
};
