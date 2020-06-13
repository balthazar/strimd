import 'react-hot-loader'

import { rehydrateMarks } from 'react-imported-component/boot'

if (process.env.NODE_ENV === 'production') {
  require('./imported')
  rehydrateMarks()
}

Promise.resolve().then(() =>
  Promise.resolve().then(() => {
    require('./main')
  }),
)
