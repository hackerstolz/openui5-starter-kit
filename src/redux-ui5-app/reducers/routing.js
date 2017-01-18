/* @flow */

sap.ui.define([], function() {

  // transform search to query object
  const [ , sSearch ] = window.location.search.split('?') || ['',''];
  const aValuePairs = sSearch.split('&') || [];
  const oQuery = aValuePairs.reduce((oTotal, sValuePair) => {
    const [ sKey, sValue ] = sValuePair.split('=') || ['',''];
    oTotal[sKey] = sValue;
    return oTotal;
  },{});

  const initialState = {

    // location information
    hash: window.location.hash,
    pathname: window.location.pathname,
    query: {
      ...oQuery
    },
    search: window.location.search,

    // ui5 routing information
    routeName: '',
    routeArgs: {}

  };

  return (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_LOCATION': {
        console.log("UPDATE");
        return { ...state, ...action.payload };
      }
      case 'UPDATE_ROUTE': {
        return { ...state, ...action.payload };
      }
      default: {
        return state;
      }
    }
  };

});
