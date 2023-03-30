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
const { use } = require('browser-sync');
let server = require('browser-sync').create();

//TODO Сделать автоматизацию для спрайта svg и сделать сборку продакшена в папку prod
//?Made automation to optimize pictures
//!test 2

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

gulp.task('webp', ()=> {
	return gulp.src('src/img/*.{jpg,png}')
	.pipe(webp())
	.pipe(gulp.dest('src/img'))
})

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