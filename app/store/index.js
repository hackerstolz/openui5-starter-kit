/* @flow */

import configureStoreProd from './configureStore.prod'
import configureStoreDev from './configureStore.dev'

const configure = process.env.NODE_ENV === 'production'
                        ? configureStoreProd
                        : configureStoreDev

export default configure
