var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var streamify = require('gulp-streamify');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var packageJson = require('./package.json');


gulp.task('browserify', function() {
    return browserify('./app/scripts/main', { debug: true})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('app/scripts'));
});

gulp.task('connect', function() {
    connect.server({
        root: 'app/',
        port: 8888
    });
});

gulp.task('lint', function() {
    gulp.src(['./app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('clean', function() {
    gulp.src('./dist/*')
    .pipe(clean({force:true}));
    gulp.src('./app/scripts/bundle.js')
      .pipe(clean({force: true}));

});

gulp.task('minify-css', function() {
    var opts = {comments:true,spare:true};
    gulp.src(['./app/**/*.css'])
    .pipe(minifyCSS(opts))
    .pipe(gulp.dist('./dist/'))
});

gulp.task('connectDist', function () {
    connect.server({
      root: 'dist/',
      port: 9999
    });
  });

  // default task
  gulp.task('default',
    ['lint', 'connect']
  );
  gulp.task('build', function() {
    runSequence(
      ['clean'],
      ['lint', 'browserify', 'connect']
    );
  });

