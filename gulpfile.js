// Simple hello task 

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const gulpUglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const concatJs = require('gulp-concat');

gulp.task('greet', (done) => {
  console.log('Hello I am gulp..! Let me automate tasks for you');
  done();
});

gulp.task('copyHtml', (done) => {
  gulp.src('src/*html')
  .pipe(gulp.dest('dist'));
  done(); 
});

gulp.task('imageMin', (done) => {
  gulp.src('src/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'))
  done();
}) 

// gulp.task('uglify', (done) => {
//   gulp.src('src/js/*.js')
//   .pipe(gulpUglify())
//   .pipe(gulp.dest('dist/js'));
//   done();
// })

gulp.task('concatJs', (done) => {
  gulp.src('src/js/*.js')
  .pipe(concatJs('main.js'))
  .pipe(gulpUglify())
  .pipe(gulp.dest('dist/js'))
  done();
})

gulp.task('compileCss',(done) => {
  gulp.src('src/sass/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('dist/css'));
  done();
});

gulp.task('watch', () => {
  gulp.watch('src/js/*.js', ['concatJs']);
  gulp.watch('src/images/*', ['imageMin']);
  gulp.watch('src/sass/*.scss', ['compileCss']);
  gulp.watch('src/*.html', ['copyHtml']);

})

gulp.task('default',gulp.series('greet','copyHtml', 'imageMin', 'concatJs', 'compileCss'));