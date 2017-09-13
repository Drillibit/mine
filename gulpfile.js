var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	imagemin = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer')
	cssnano = require('gulp-cssnano')
	minify = require('gulp-minify');


// Compile SASS
gulp.task('sass', function(){
	return gulp.src('assets/main.sass')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(sass().on('error', sass.logError))
		.pipe(cssnano())
		.pipe(gulp.dest('assets/main.css'))
		.pipe(browserSync.stream());
});
//js
gulp.task('js', function(){
	gulp.src('assets/js/raw/**/*.js')
	.pipe(minify({
		ext:{
			src: 'main.js',
			min: '.js'
		},
		exclude: ['tasks'],
		noSource: true
	}))
	.pipe(gulp.dest('assets/js/main'))
});
// Image Task
gulp.task('image', function(){
	gulp.src('images/*')
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5})
		]))
		.pipe(gulp.dest('images/'));
});

// AutoPrefix
gulp.task('autoprefixer', () =>
    gulp.src('assets/main.css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        // .pipe(gulp.dest('dist'))
);

// Browser Sync
gulp.task('serve', ['sass'], function(){
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	gulp.watch('assets/**/*.sass', ['sass']);
	gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('watch', function(){
	gulp.watch('slick/**/*.css');
	gulp.watch('assets/**/*.sass', ['sass']);
	gulp.watch('assets/**/*.css', ['autoprefixer']);
	gulp.watch('assets/**/*.js', ['js']);
});

gulp.task('default', ['serve', 'sass', 'watch', 'autoprefixer', 'js']);
