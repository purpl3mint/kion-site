import gulp from 'gulp'

import { cleanBuild, cleanReport } from './gulp/clean.js'
import { pug2html } from './gulp/pug2html.js'
import { normalize } from './gulp/normalize.js'
import { styles } from './gulp/styles.js'
import { script } from './gulp/script.js'
import { imageMinify } from './gulp/imageMinify.js'
import { serve as serveStart } from './gulp/serve.js'
//import { lighthouse as lighthouseRunner } from './gulp/lighthouse.js'
import { favicon } from './gulp/favicon.js'
import { criticalGen } from './gulp/critical.js'

const createGulpTask = (tag, f) => {
    gulp.task(tag, (done) => {
        f();
        done();
    })
}

createGulpTask('cleanBuild', cleanBuild)
createGulpTask('cleanReport', cleanReport)
createGulpTask('pug2html', pug2html)
createGulpTask('normalize', normalize)
createGulpTask('styles', styles)
createGulpTask('script', script)
createGulpTask('imageMinify', imageMinify)
createGulpTask('favicon', favicon)
createGulpTask('serveStart', serveStart)
//createGulpTask('lighthouseRunner', lighthouseRunner)
//createGulpTask('criticalGen', criticalGen)


//const build = gulp.series(cleanBuild, pug2html, normalize, styles, script, imageMinify, favicon, criticalGen)
const build = gulp.series('cleanBuild', 'pug2html', 'normalize', 'styles', 'script', 'imageMinify', 'favicon')

export const start = gulp.series(build)

export const serve = gulp.series(build, 'serveStart')

//export const lighthouse = gulp.series('cleanReport', 'lighthouseRunner')