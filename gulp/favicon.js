import gulp from 'gulp'

export function favicon(cb) {
  return gulp.src('src/favicon/*.ico')
    .pipe(gulp.dest('build'))
}