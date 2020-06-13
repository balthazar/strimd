import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Helmet } from 'react-helmet-async'

const Box = styled.div`
  background: blue;
  width: 100px;
  height: 100px;
`

export default () => {
  return (
    <div>
      <Helmet>
        <title>Home page</title>
      </Helmet>
      <Box />
      <Link to="/about">Click here</Link> to see a code-split component.
    </div>
  )
}
