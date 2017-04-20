module.exports = function(grunt) {
    // require('jit-grunt')(grunt, {
    //     express : 'grunt-express-server',
    //     cssmin : 'grunt-contrib-cssmin'
    // });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        pug: {
            compile: {
                options: {
                    pretty: true,
                },
                files: [{
                    expand: true,
                    cwd: 'views/pug/',
                    src: ['index.pug'],
                    dest: './',
                    ext: '.html',
                }]
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'views/scss',
                    src: ['*.scss'],
                    dest: 'public/css/',
                    ext: '.css',
                }]
            }
        },
        express: {
            options: {
            },
            dev:{
                options: {
                    script: './app.js',
                    background: true,
                }
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            pug: {
                files: 'views/pug/*.pug',
                tasks: ['pug']
            },
            sass: {
                files: 'views/scss/*.scss',
                tasks: ['sass'],
                options: {
                    debounceDelay: 250,
                    livereload: false
                },
            },
            js: {
                files: 'public/js/*.js',
            },
            express: {
                files: ['./app.js', './config.js'],
                tasks: ['express:dev'],
                options: {
                    event: ['changed'],
                    spawn: false,
                    debounceDelay: 500,
                    interrupt: true,
                }
            },
        },
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['express:dev', 'sass', 'watch', 'pug']);
    grunt.registerTask('build', ['pug']);

}