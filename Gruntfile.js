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
					{src: 'assets/js/*.js'}
				]
			}
		},

		yslow: {

			options: {
				thresholds: {
					weight: 180,
					speed: 1000,
					score: 80,
					requests: 15
				},
				debug: true
			},
			pages: {
				files: [
					{
						src: 'http://andyshora.com'
					},
					{
						src: 'http://www.google.co.uk',
						thresholds: {
							weight: 80
						}
					}
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
					'public_html/assets/css/main.css': 'public_html/assets/css/sass/main.scss'
				}
			}
		},

		cssmin: {
				'css': {
						'src': ['public_html/assets/css/main.css'],
						'dest': 'public_html/assets/css/m.min.css'
				}
		},

		min: {
			'js': {
						'src': ['public_html/assets/js/main.js'],
						'dest': 'public_html/assets/js/m.min.js'
				}
		},

		replace: {
			homepage: {
				src: ['public_html/dev.html'],
				dest: 'public_html/index_full.html',
				replacements: [
				{
					from: 'assets/js/main.js',
					to: 'assets/js/m.min.js'
				},
				{
					from: 'assets/css/main.css',
					to: 'assets/css/m.min.css'
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

		compress: {
			js: {
				options: {
				mode: 'gzip'
				},
				expand: true,
				cwd: 'public_html/assets/js',
				src: ['*.js'],
				dest: 'public_html/assets/js'
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
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-yslow');


	// Default task.
	grunt.registerTask('default', ['jshint', 'sass', 'cssmin', 'min', 'replace', 'htmlcompressor', 'compress']);

};
