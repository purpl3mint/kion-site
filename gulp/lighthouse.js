import path from 'path'
//const fs = require('fs').promises
import { promises as fs } from 'fs'
import open from 'open'
import browserSync from 'browser-sync'
const server = browserSync.create()
import { deleteAsync as del } from 'del'
//const lighthouse = require('lighthouse')
import chromeLauncher from 'chrome-launcher'
import { write } from 'lighthouse/lighthouse-cli/printer.js'
import reportGenerator from 'lighthouse/report/generator/report-generator.js'
import compression from 'compression'
import http2 from 'http2'

import { config } from './config.js'

async function getNameHTMLFiles() {
  const files = await fs.readdir(config.buildPath)

  return files.filter(item => item.endsWith('.html'))
}

function startServer() {
  return server.init({
    server: {
      baseDir: config.buildPath,
      middleware: function(req,res,next){
        let gzip = compression();
        gzip(req,res,next);
      }
    },
    port: config.lighthouse.PORT,
    httpModule: http2,
    notify: false,
    open: false,
    cors: true
  })
}

async function launchChromeAndRunLighthouse(url) {
  const chrome = await chromeLauncher.launch()
  config.lighthouse.chromeLauncherPort = chrome.port

  const result = await lighthouse(url, {
    ...config.lighthouse.flags,
    port: config.lighthouse.chromeLauncherPort
  }, config.lighthouse.config)
  await chrome.kill()

  return result
}

async function runLighthouse(fileName) {
  console.log(fileName)
  const result = await launchChromeAndRunLighthouse(`http://localhost:${config.lighthouse.PORT}/${fileName}`)

  await write(reportGenerator.generateReportHtml(result.lhr), 'html', path.join(config.lighthouse.reportPath, fileName))
}

export async function lighthouse(cb) {
  await del(config.lighthouse.reportPath)
  await fs.mkdir(config.lighthouse.reportPath)

  startServer()
  const files = await getNameHTMLFiles()

  try {
    for (const file of files) {
      await runLighthouse(file)
    }

    for (const file of files) {
      await open(path.join(config.lighthouse.reportPath, file))
    }
    cb()
    process.exit(0) //browser-sync API server.exit() do not work
  } catch (e) {
    cb(e.message)
    process.exit(1) //browser-sync API server.exit() do not work
  }
}