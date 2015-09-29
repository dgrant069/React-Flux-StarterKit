var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sourcemaps = require("gulp-sourcemaps"),
	babel = require("gulp-babel"),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	browserSync = require('browser-sync').create(),
	del = require('del');

gulp.task('default', function(){
	//default task
});

// Gulp task
gulp.task('styles', function() {
	return sass('src/**/*.scss', { style: 'expanded' })
		.pipe(autoprefixer('last 2 version'))
		.pipe(concat('main.css'))
		.pipe(gulp.dest('build/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('build/css'))
		.pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
	return gulp.src('src/**/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'))
		.pipe(sourcemaps.init())
    	.pipe(babel())
    	.pipe(concat('main.js'))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest('build/js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'))
		.pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
	return gulp.src('src/assets/**/*')
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(gulp.dest('build/img'))
		.pipe(notify({ message: 'Images task complete' }));
});

// cb is callback
gulp.task('clean', function(cb) {
	del(['build/css', 'build/js', 'build/img'], cb);
});

gulp.task('buildProd', ['clean', 'styles', 'scripts', 'images'], function() {
	// .pipe(notify({ message: 'Build done' }));
});

// gulp.task('watch', function() {
// 	// Create LiveReload server
// 	livereload.listen();

// 	// Watch any files in src, reload on change
// 	gulp.watch(['src/**']).on('change', livereload.changed);
// });

// gulp.task('watchMin', function() {
// 	// Minimize the files and create build
// 	// Watch .scss files
// 	gulp.watch('src/**/*.scss', ['styles']);

// 	// Watch .js files
// 	gulp.watch('src/**/*.js', ['scripts']);

// 	// Watch image files
// 	gulp.watch('src/assets/**/*', ['images']);

// 	// Create LiveReload server
// 	livereload.listen();

// 	// Watch any files in build/, reload on change
// 	gulp.watch(['build/**']).on('change', livereload.changed);
// });


gulp.task('serve', function () {
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch(['src/**']).on('change', browserSync.reload);
});



