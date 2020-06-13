import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { rehydrateMarks } from 'react-imported-component'
import { HelmetProvider } from 'react-helmet-async'

import App from './components/App'

const element = document.getElementById('root')
const app = (
  <BrowserRouter>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </BrowserRouter>
)

rehydrateMarks().then(() => {
  const isProd = process.env.NODE_ENV === 'production'
  ReactDOM[isProd ? 'hydrate' : 'render'](app, element)
})

if (module.hot) {
  module.hot.accept()
}
