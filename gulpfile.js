const gulp = require('gulp');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

const uglify = require('gulp-uglify');
const pump = require('pump');

var sass = require('gulp-sass');

// Gulp Tasks : http://gulpjs.com/plugins/
// GULP WORKING WITH PLUGIN!
// GULP BABEL : npm install --save-dev gulp-babel babel-preset-es2015

gulp.task('default',function () {
    // GULP task
    gutil.log('Hello default!')
});

/** BABEL */

gulp.task('babel',function () {
    // BABEL JS task
    return gulp.src('./js/index.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/index.babel.js'))

});

gulp.task('babel:sm', () => {
    return gulp.src('js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

/** COMPRESS */
gulp.task('compress', function (cb) {
  pump([
        gulp.src('js/*.js'),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});

/* SASS */
gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/*.scss', ['sass']);
});


gulp.task('sass:sm', function () {
 return gulp.src('./sass/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('./css'));
});

gulp.task('sass:compress', function () {
 return gulp.src('./sass/*.scss')
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest('./css'));
});