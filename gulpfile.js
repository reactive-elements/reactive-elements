var gulp = require('gulp');
var react = require('gulp-react');
var uglify = require('gulp-uglify');
var karma = require('gulp-karma');

var testFiles = [
    'demo/bower_components/bind-polyfill/index.js',
    'demo/bower_components/react/react.min.js',
    'src/*.js',
    'test/*.spec.js'
];

gulp.task('test', function() {
    // Be sure to return the stream
    return gulp.src(testFiles)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});

gulp.task('default', function() {
    gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));

    gulp.src('demo/jsx/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('demo/dist'));
});