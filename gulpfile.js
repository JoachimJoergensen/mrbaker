const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const webpack = require('gulp-webpack');
const browserSync = require('browser-sync').create();

gulp.task('styles', () => gulp.src('./src/scss/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({ 'outputStyle': 'compressed' })
		.on('error', sass.logError))
	.pipe(autoprefixer('last 4 version'))
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest('./dist/assets/stylesheets'))
	.pipe(browserSync.stream())
);

gulp.task('scripts', () => gulp.src('./src/javascripts/index.js')
	.pipe(webpack({
		'output': {
			'filename': 'bundle.js'
		}
	}))
	.pipe(gulp.dest(('./dist/assets/javascripts/')))
	.pipe(browserSync.stream())
);

gulp.task('html', () => gulp.src('./src/html/*.html')
	.pipe(gulp.dest('./dist/'))
	.pipe(browserSync.stream())
);

gulp.task('watch', () => {
	browserSync.stream();
	gulp.watch('./src/scss/*.scss', ['styles']);
	gulp.watch('./src/javascripts/*.js', ['scripts']);
	gulp.watch('./src/html/*.html', ['html']);
});

gulp.task('browser-sync', () => {
	browserSync.init({
		'server': {
			'baseDir': './dist'
		}
	});
});

gulp.task('serve', ['browser-sync', 'watch']);