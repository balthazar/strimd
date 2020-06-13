import path from 'path'
import compression from 'compression'
import express from 'express'

import middleware from './middleware'

const app = express()

app.use(compression())

app.use('/dist', express.static(path.join(__dirname, '../client')))

app.get('/*', middleware)

const port = process.env.PORT || 1234

app.listen(port, () => {
  console.log(`Listening on :${port}`)
})
