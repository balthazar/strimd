import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import importedComponent from 'react-imported-component'
import { Helmet } from 'react-helmet-async'
import { hot } from 'react-hot-loader'

import Home from './Home'

const About = importedComponent(() => import('./About'))

export default hot(module)(() => {
  return (
    <div>
      <Helmet defaultTitle="Hello World!">
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Redirect to="/" />
      </Switch>
    </div>
  )
})
