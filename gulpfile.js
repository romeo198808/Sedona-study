var gulp = require('gulp');
var less = require('gulp-less');
var plumber =require('gulp-plumber');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var server =require('browser-sync').create();

gulp.task('style', function(){
	return gulp.src('src/less/style.less')
	.pipe(plumber())
	.pipe(less())
	.pipe(autoprefixer())
	.pipe(gulp.dest('src/css'))
	.pipe(cssmin())
	.pipe(rename('style.min.css'))
	.pipe(gulp.dest('src/css'))
	.pipe(server.stream())
});

gulp.task('normalize', function(){
	return gulp.src('src/css/normalize.css')
	.pipe(cssmin())
	.pipe(rename('normalize.min.css'))
	.pipe(gulp.dest('src/css'))
	.pipe(server.stream())
});

gulp.task('serve', function() {
	server.init({
		server: "src",
		notify: false,
		open: true,
		cors: true,
		ui: false
	});
	gulp.watch('src/less/**/*.less', gulp.series('style')).on('change', server.reload);
	gulp.watch('src/*.html').on('change', server.reload);
	gulp.watch('src/css/normalize.css', gulp.series('normalize')).on('change', server.reload);
});

gulp.task('start', gulp.series('normalize','style', 'serve'));