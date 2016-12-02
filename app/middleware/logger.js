/* @flow */

/**
 * THIS IS AN OPTIONAL LOGGER THAT CAN BE USED INSTEAD OF REDUX-LOGGER.
 */
import { createStore } from 'redux'

export default (store: createStore) => (next: createStore) => (action: createStore)  => { // eslint-disable-line no-unused-vars
  console.log(action) // eslint-disable-line no-console
  return next(action)
}
