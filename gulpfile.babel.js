import gulp from 'gulp';
import concat from 'gulp-concat';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';

const paths = {
  scssSrc: 'public/assets/styles/scss/*.scss',
  scssDest: 'public/assets/styles',
  jsSource:  'public/app/**/*.js',
  jsDest: 'public/assets/js',
  serverSource: 'server/**/*.js'
};

gulp.task('styles', () => {
  return gulp.src(paths.scssSrc)
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('styles.css'))
  .pipe(gulp.dest(paths.scssDest));
});

gulp.task('frontjs', () => {
  return gulp.src(paths.jsSource)
  .pipe(plumber())
  .pipe(babel({
    presets: ["es2015"]
  }))
  .pipe(gulp.dest('./dist/www'));
});

gulp.task('serverjs', () => {
  return gulp.src(paths.serverSource)
  .pipe(plumber())
  .pipe(babel({
    presets: ["es2015"]
  }))
  .pipe(gulp.dest('./dist/server'));
});

gulp.task('watch', () =>  {
  gulp.watch(paths.jsSource, ['frontjs']);
  gulp.watch(paths.serverSource, ['serverjs']);
  gulp.watch(paths.sassSource, ['styles']);
});

gulp.task('default', ['watch', 'frontjs', 'serverjs', 'styles']);
