import React from 'react'
import { Helmet } from 'react-helmet-async'

export default React.memo(() => {
  return (
    <div>
      <Helmet>
        <title>About</title>
      </Helmet>

      <div onClick={() => alert('ok')}>about us</div>
    </div>
  )
})
