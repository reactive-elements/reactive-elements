var gulp = require('gulp');
var react = require('gulp-react');
var uglify = require('gulp-uglify');
var karma = require('gulp-karma');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

var testFiles = [
    'node_modules/bind-polyfill/index.js',
    'node_modules/react/react.min.js',
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
    gulp.src('src/reactive-elements.js')
        .pipe(browserify({
            external: ['react', 'react-dom'],
            standalone: 'ReactiveElements',
            debug : !gulp.env.production
        }))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('dist'));

    gulp.src('demo/jsx/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('demo/dist'));
});
