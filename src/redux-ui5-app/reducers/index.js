/* @flow */

sap.ui.define([
  'ps/reducers/routing',
  'ps/reducers/main'
], function(routing, main) {

  const { combineReducers } = window.Redux;

  return combineReducers({
    routing,
    main
  });

});
