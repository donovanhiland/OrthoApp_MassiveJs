var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngmin = require('gulp-ngmin');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var babel = require('gulp-babel');

var paths = {
  scssSrc: 'public/assets/styles/scss/*.scss',
  scssDest: 'public/assets/styles',
  jsSource:  'public/app/**/*.js',
  jsDest: 'public/assets/js',
  serverSource: 'server/**/*.js'
};

gulp.task('styles', function() {
  return gulp.src(paths.scssSrc)
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('styles.css'))
  .pipe(gulp.dest(paths.scssDest));
});

gulp.task('frontjs', function() {
  return gulp.src(paths.jsSource)
  .pipe(plumber())
  .pipe(babel({
    presets: ["es2015"]
  }))
  .pipe(gulp.dest('./www'));
});

gulp.task('serverjs', function() {
  return gulp.src(paths.serverSource)
  .pipe(plumber())
  .pipe(babel({
    presets: ["es2015"]
  }))
  .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function()  {
  gulp.watch(paths.jsSource, ['frontjs']);
  gulp.watch(paths.serverSource, ['serverjs']);
  gulp.watch(paths.sassSource, ['styles']);
});

gulp.task('default', ['watch', 'frontjs', 'serverjs', 'styles']);
