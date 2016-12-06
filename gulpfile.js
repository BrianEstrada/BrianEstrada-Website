var gulp = require('gulp'),
    concat = require('gulp-concat');
    sass = require('gulp-sass'),
    uncss = require('gulp-uncss'),
    webpack = require('gulp-webpack'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    header = require('gulp-header'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    package = require('./package.json');

var requireConfig = {
    baseUrl: __dirname
};
var options = {
    umd: false
};

var banner = [
    '/*!\n' +
    ' * <%= package.name %>\n' +
    ' * <%= package.title %>\n' +
    ' * <%= package.url %>\n' +
    ' * @author <%= package.author %>\n' +
    ' * @version <%= package.version %>\n' +
    ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
    ' */',
    '\n'
].join('');


gulp.task('css', function () {
    return gulp.src('src/scss/app.scss')
        .pipe(sass({errLogToConsole: true}))
        .pipe(autoprefixer('last 4 version'))
        .pipe(gulp.dest('app/css'))
        /*
        .pipe(uncss({
            html: ['http://localhost:3000/#home']
        }))
        */
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(header(banner, {package: package}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function () {
    gulp.src([
        'src/js/jquery.min.js',
        'src/js/jquery.validate.js',
        'src/js/typed.js',
        'src/js/magnific-popup.js',
        'src/js/masonry.pkgd.js',
        'src/js/masonry-filter.js',
        'src/js/imagesloaded.pkgd.js',
        'src/js/glitche-scripts.js'
    ])
        .pipe(concat('all.js'))
        .pipe(header(banner, {package: package}))
        .pipe(gulp.dest('app/js'))
        .pipe(uglify())
        .pipe(header(banner, {package: package}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream: true, once: true}));
});

gulp.task('browser-sync', function () {
    browserSync.init(null, {
        server: {
            baseDir: "app/"
        }
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['css', 'js', 'browser-sync'], function () {
    gulp.watch("src/scss/**/*.scss", ['css']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("app/*.html", ['bs-reload']);
});