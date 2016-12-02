/* @flow */

import { createStore, applyMiddleware } from 'redux'

import rootReducer from '../reducers'
import { thunk, promise } from '../middleware'

const createStoreWithMiddleware = applyMiddleware(
  promise(),
  thunk
)(createStore)

const configure = (initialState?: any) => createStoreWithMiddleware(rootReducer, initialState)

module.exports = configure
