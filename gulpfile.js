// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass   = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var mincss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var smaps  = require('gulp-sourcemaps');
var browserSync = require('browser-sync');

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// task for reloading the browser
gulp.task('bs-reload', function() {
    browserSync.reload();
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('assets/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// compile, prefix, and minify the sass
gulp.task('styles', function() {
    return gulp.src('assets/scss/*.scss')
        .pipe(sass( {sourceComments: 'map', errLogToConsole: true} ))
        .pipe(prefix(["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1" , "ie 7"], { cascade: true }))
        .pipe(gulp.dest('assets/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(mincss())
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.reload({stream:true}));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('assets/js/*.js')
        .pipe(smaps.init())
            .pipe(concat('all.min.js'))
            .pipe(uglify())
        .pipe(smaps.write('../maps'))
        .pipe(gulp.dest('assets/js/dist'))
        .pipe(browserSync.reload({stream:true}));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('assets/js/*.js', ['lint', 'scripts']);
    gulp.watch('assets/scss/*.scss', ['styles']);
    gulp.watch('*.html', ['bs-reload']);
});

// Default Task
gulp.task('default', ['lint', 'styles', 'scripts', 'browser-sync', 'watch']);