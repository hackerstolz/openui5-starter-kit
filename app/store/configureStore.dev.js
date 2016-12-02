/* @flow */

import { createStore, applyMiddleware, compose } from 'redux'
import persistState from 'redux-localstorage'

import { logger, thunk, promise } from '../middleware'
import rootReducer from '../reducers'


const enhancer = compose(
  // middleware we want to use in development
  applyMiddleware(
    promise(),
    thunk,
    logger()
  ),
  // store enhancer that syncs (a subset) of your Redux store state to localstorage
  persistState()
)

const configure = (initialState?: any) => createStore(rootReducer, initialState, enhancer)

export default configure
