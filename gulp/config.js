import path from 'path'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const root = path.join(path.dirname(__filename), '../')
const src = path.join(root, 'src')

export const config = {
  root,
  src,
  buildPath: path.join(root, '/build'),
  lighthouse: {
    reportPath: path.join(root, 'reports'),
    PORT: 8080,
    chromeLauncherPort: 9222,
    config: {
      extends: 'lighthouse:default'
    },
    flags: {
      // available options - https://github.com/GoogleChrome/lighthouse/#cli-options
      chromeFlags: ['--show-paint-rects'],
      output: 'html'
    }
  }
}