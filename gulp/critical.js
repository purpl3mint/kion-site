import gulp from 'gulp'
import critical from 'critical'

export function criticalGen (cb) {
  return critical.generate({
    inline: true,
    base: './build/',
    src: 'index.html',
    target: {
      html: './index-critical.html',
      css: './css/critical.css',
      uncritical: './css/uncritical.css'
    },
    width: 1920,
    height: 700
  })
}