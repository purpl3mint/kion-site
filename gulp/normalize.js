import gulp from 'gulp'
import plumber from 'gulp-plumber'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'

export function normalize() {
  return gulp.src('src/styles/normalize/normalize.css')
      .pipe(plumber())
      .pipe(cleanCSS({
          debug: true,
          compatibility: '*'
        }, details => {
          console.log(`${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`)
        }))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('build/css'))
}

