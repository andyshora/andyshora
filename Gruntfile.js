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

    cssmin: {
        'css': {
            'src': ['public_html/css/main.css'],
            'dest': 'public_html/css/s.min.css'
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
        dest: 'public_html/index_full.html',             // destination directory or file
        replacements: [
        { 
          from: 'js/main.js',      
          to: 'js/m.min.js' 
        },
        { 
          from: 'css/main.css',               
          to: 'css/s.min.css' 
        }/*, { 
          from: /(f|F)(o{2,100})/g,      // regex replacement ('Fooo' to 'Mooo')
          to: 'M$2' 
        }, {
          from: 'Foo',
          to: function (matchedWord) {   // callback replacement
            return matchedWord + ' Bar';
          }
        }*/
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
    }

  });

  // These plugins provide necessary tasks.
  //grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-qunit');
  //grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-casperjs');
  grunt.loadNpmTasks('grunt-yui-compressor');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-htmlcompressor');

  // Default task.
  grunt.registerTask('default', ['jshint', 'cssmin', 'min', 'replace', 'htmlcompressor', 'casperjs']);

};
