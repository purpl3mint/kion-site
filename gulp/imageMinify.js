import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import webp from 'gulp-webp'

export function imageMinify(cb) {
  return gulp.src('src/img/*.{gif,png,jpg,svg,webp}')
    /*
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({
        quality: 75,
        progressive: true
      }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    */
    .pipe(imagemin())
    .pipe(webp())
    .pipe(gulp.dest('build/img'))
}