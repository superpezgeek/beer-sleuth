var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss'],
  angular: {
    app: ['./assets/app/app.js'],
    controllers: ['./assets/app/controllers/**/*.js'],
    services: [
      './assets/app/services/**/*.js',
      './assets/app/models/**/*.js'
    ],
  }
};

gulp.task('default', [
  'sass',
  'angular-app',
  'angular-controllers',
  'angular-services'
]);

gulp.task('angular-app', function() {
  gulp.src(paths.angular.app)
    .pipe(gulp.dest('./www/assets/js/app/'));
});

gulp.task('angular-controllers', function() {
  gulp.src(paths.angular.controllers)
    .pipe(concat('controllers.js'))
    .pipe(gulp.dest('./www/assets/js/app/'));
});

gulp.task('angular-services', function() {
  gulp.src(paths.angular.services)
    .pipe(concat('services.js'))
    .pipe(gulp.dest('./www/assets/js/app/'));
});

gulp.task('sass', function(done) {
  gulp.src('./assets/scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/assets/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/assets/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.angular.app, ['angular-app']);
  gulp.watch(paths.angular.controllers, ['angular-controllers']);
  gulp.watch(paths.angular.controllers, ['angular-services']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
