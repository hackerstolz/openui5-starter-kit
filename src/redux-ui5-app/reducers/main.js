/* @flow */

sap.ui.define([
  // load plug ins
  // 'ps/libs/redux-actions'
], function() {

  // console.log(ReduxActions);

  // const { handleActions } = ReduxActions;

  const initialState = {
    counter: 0
  };
  //
  // return handleActions({
  //
  //
  // }, initialState)

  return (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return { ...state, counter: state.counter + 1 };
      default:
        return state;
    }
  };

});
