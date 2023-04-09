"use strict"

let gulp = require('gulp');
let less = require('gulp-less');
let plumber =require('gulp-plumber');
let cssmin = require('gulp-cssmin');
let rename = require('gulp-rename');
let autoprefixer = require('gulp-autoprefixer');
let svgo = require('gulp-svgo');
let imagemin = require('gulp-imagemin');
let webp = require('gulp-webp');
let svgstore = require('gulp-svgstore');
let clean  = require('gulp-clean');
let copy = require('gulp-copy');
const { use } = require('browser-sync');
let server = require('browser-sync').create();




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

gulp.task('svg-sprite', ()=> {
	return gulp.src('src/img/icon-*.svg')
	.pipe(svgstore({inlineSvg: true}))
	.pipe(rename('sprite.svg'))
	.pipe(gulp.dest('src/img'))
});

gulp.task('webp', ()=> {
	return gulp.src('src/img/*.{jpg,png}')
	.pipe(webp())
	.pipe(gulp.dest('src/img'))
});

gulp.task('image', ()=> {
	return gulp.src('src/img/*.{png,jpg,svg}')
	.pipe(imagemin([
		imagemin.mozjpeg({quality: 70, progressive: true}),
		imagemin.optipng({optimizationLevel:3}),
		imagemin.svgo()
	]))
	.pipe(gulp.dest('src/img'))
});

gulp.task('svgo', ()=> {
	return gulp.src('src/img/*.svg')
	.pipe(svgo())
	.pipe(gulp.dest('src/img'))
	.pipe(server.stream())
});

gulp.task('normalize', ()=> {
	return gulp.src('src/css/normalize.css')
	.pipe(cssmin())
	.pipe(rename('normalize.min.css'))
	.pipe(gulp.dest('src/css'))
	.pipe(server.stream())
});

gulp.task('clean', ()=> {
	return gulp.src('prod')
	.pipe(clean());
});

gulp.task('copy', ()=> {
	return gulp.src([
		'src/*.html',
		'src/css/**/*.css',
		'src/fonts/**/*.*',
		'src/img/**/*.*',
		'src/js/**/*.js',
	], {base:'src'})
	// .pipe(copy('prod'));
	.pipe(gulp.dest('prod/'));
});

gulp.task('serve', ()=> {
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

gulp.task('start', gulp.series('normalize', 'image', 'webp', 'svg-sprite', 'style', 'serve'));

gulp.task('prod', gulp.series('clean', 'normalize', 'image', 'webp', 'svg-sprite', 'style', 'copy'));