/*jslint node: true */
"use strict";

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('andyshora_grunt.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			dist: {
				src: ['src/<%= pkg.name %>.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},

		qunit: {
			files: ['test/**/*.html']
		},

		jshint: {
			gruntfile: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: 'Gruntfile.js'
			},
			individual_files: {
				files: [
					{src: 'Gruntfile.js'},
					{src: 'js/main.js'}
				]
			},
			casperjs_files: {
				files: [
					{src: 'test/casperjs/tests/*.js'}
				]
			}
		},

		casperjs: {
				'homepage': {
					options: {
						includes: ['test/casperjs/inc.js'],
						pre: ['test/casperjs/pre.js'],
						post: ['test/casperjs/post.js']
					},
					files: { 'src': ['test/casperjs/tests/resources.js'] }
				}

		},

		sass: {
			dist: {
				files: {
					'public_html/css/dist/main.css': 'public_html/css/sass/main.scss'
				}
			}
		},

		cssmin: {
				'css': {
						'src': ['public_html/css/dist/main.css'],
						'dest': 'public_html/css/dist/s.min.css'
				}
		},

		min: {
			'js': {
						'src': ['public_html/js/main.js'],
						'dest': 'public_html/js/m.min.js'
				}
		},

		replace: {
			example: {
				src: ['public_html/dev.html'],
				dest: 'public_html/index_full.html',
				replacements: [
				{
					from: 'js/main.js',
					to: 'js/m.min.js?2'
				},
				{
					from: 'css/main.css',
					to: 'css/s.min.css?2'
				}
				]
			}
		},

		htmlcompressor: {
			compile: {
				files: {
					'public_html/index.html': 'public_html/index_full.html'
				},
				options: {
					type: 'html',
					preserveServerScript: true
				}
			}
		},

		watch: {
			scripts: {
				files: ['**/*.scss'],
				tasks: ['sass'],
				options: {
					nospawn: true
				}
			}
		}

	});

	// These plugins provide necessary tasks.
	//grunt.loadNpmTasks('grunt-contrib-concat');
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-casperjs');
	grunt.loadNpmTasks('grunt-yui-compressor');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-htmlcompressor');
	grunt.loadNpmTasks('grunt-contrib-sass');


	// Default task.
	grunt.registerTask('default', ['jshint', 'sass', 'cssmin', 'min', 'replace', 'htmlcompressor']);

};
