import fs from 'fs'
import path from 'path'
import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { printDrainHydrateMarks, ImportedStream } from 'react-imported-component'
import { ServerStyleSheet } from 'styled-components'
import { createLoadableStream } from 'react-imported-component/server'

import App from '../app/components/App'

// If need normal styles or SCSS, integrate with https://github.com/theKashey/used-styles

const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, '/../client/parcel-manifest.json')),
)

export default async (req, res) => {
  if (req.originalUrl.endsWith('.ico')) {
    res.status(404)
    return res.end()
  }

  const context = {}
  const helmetContext = {}

  console.log(req.originalUrl)

  const streamUID = createLoadableStream()
  const app = (
    <ImportedStream stream={streamUID}>
      <StaticRouter location={req.originalUrl} context={context}>
        <HelmetProvider context={helmetContext}>
          <App />
        </HelmetProvider>
      </StaticRouter>
    </ImportedStream>
  )

  const sheet = new ServerStyleSheet()
  const htmlStream = sheet.interleaveWithNodeStream(renderToNodeStream(sheet.collectStyles(app)))

  if (context.url) {
    return res.redirect(301, context.url)
  }

  setTimeout(() => {
    const { helmet } = helmetContext
    const headers = helmet ? `
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
    ` : ''

    res.write(
      `<!DOCTYPE html><html><head>${headers}<script defer src="${manifest['client.js']}"></script></head><body><div id="root">`,
    )

    htmlStream.pipe(res, { end: false })

    htmlStream.on('end', () => {
      res.write('</div>')
      res.write(printDrainHydrateMarks(streamUID))
      res.write('</body></html>')
      res.end()
    })
  })
}
