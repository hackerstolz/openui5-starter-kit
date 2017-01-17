/* @flow */

sap.ui.define([
  'ps/reducers/main'

  // load plug ins
  // 'ps/libs/redux' // exports Redux
], function(main) {

  const { combineReducers } = Redux;

  return combineReducers({
    // routing,
    main
  });

});
