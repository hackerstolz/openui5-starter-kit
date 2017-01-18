sap.ui.define([
  'sap/ui/core/UIComponent',
  'sap/ui/core/routing/HashChanger',
  'sap/ui/model/json/JSONModel',
  'ps/model/models',
  'ps/reducers/index'

  // load plug ins
  // 'ps/libs/redux' // exports Redux
], function(UIComponent, HashChanger, JSONModel, models, rootReducer) {

  // TEST ACTION
  const UPDATE_LOCATION = 'UPDATE_LOCATION';
  const updateLocation = (oLocation) => ({
    type: UPDATE_LOCATION,
    payload: oLocation
  });

  const UPDATE_ROUTE = 'UPDATE_ROUTE';
  const updateRoute = (oRoute) => ({
    type: UPDATE_ROUTE,
    payload: oRoute
  });

  return UIComponent.extend('ps.Component', {

    __store: null,

    metadata: {
      manifest: 'json'
    },

    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * @public
     * @override
     */
    init() {

      // call the base component's init function
      UIComponent.prototype.init.apply(this, arguments);

      // create the views based on the url/hash
      this.getRouter().initialize();

      // set the device model
      this.setModel(models.createDeviceModel(), 'device');

      // initialize store
      this.__store = this._configureStore(rootReducer);

      // sync router with store

      // a) sync ui5 routing information (is fired befor hashchange)
      this.getRouter().attachRouteMatched(oEvent => {
        const { name, arguments: args } = oEvent.getParameters();
        this.__store.dispatch(updateRoute({
          routeName: name,
          routeArgs: {
            ...args
          }
        }));
      });

      // b) sync location information
      $(window).on('hashchange', () => {
        this.__store.dispatch(updateLocation(this._parseRoutingInformation()));
      });

      // initialize the main model with initial state
      const oMainModel = new JSONModel(this.__store.getState());
      oMainModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
      this.setModel(oMainModel);

      // subscribe to store
      this.__store.subscribe(() =>  {

        const oNewState = this.__store.getState();

        // update window location from store (only for debugging purpose), usually this is a no go in the reducer
        // const { hash, pathname, query, search } = oNewState.routing;
        // if (query['sap-ui-debug'] === 'true') {
        //   if (window.location.hash !== hash) { window.location.hash = hash; }
        //   if (window.location.pathname !== pathname) { window.location.pathname = pathname; }
        //   if (window.location.search !== search) { window.location.search = search; }
        // }

        // update main model with new state
        // TODO: check if only bindings with changed attribute values are updated
        this.getModel().setData( oNewState );

      });

    },

    getStore() {
      return this.__store;
    },

    _parseRoutingInformation() {

      // transform search to query object
      const [ , sSearch ] = window.location.search.split('?') || ['',''];
      const aValuePairs = sSearch.split('&') || [];
      const oQuery = aValuePairs.reduce((oTotal, sValuePair) => {
        const [ sKey, sValue ] = sValuePair.split('=') || ['',''];
        oTotal[sKey] = sValue;
        return oTotal;
      },{});

      return {
        hash: window.location.hash,
        pathname: window.location.pathname,
        query: {
          ...oQuery
        },
        search: window.location.search
      };

    },

    _configureStore(rootReducer) {

      const { createStore, applyMiddleware, compose } = window.Redux;
      const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

      const enhancer = composeEnhancers(
        // middleware we want to use in development
        applyMiddleware(
          this._getThunkMiddleware(),
          this._getLogger(),
        )
      );

      const initialState = {};

      return createStore(rootReducer, initialState, enhancer);

    },

    _getThunkMiddleware() {

      function createThunkMiddleware(extraArgument) {
        return ({ dispatch, getState }) => next => action => {
          if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
          }
          return next(action);
        };
      }

      const thunk = createThunkMiddleware();
      thunk.withExtraArgument = createThunkMiddleware;

      return thunk;

    },

    _getLogger() {

      function createLogger() {
        return (store) => (next) => (action)  => { // eslint-disable-line no-unused-vars
          console.log(action); // eslint-disable-line no-console
          return next(action);
        };
      }

      const logger = createLogger();

      return logger;

    }

  });
});
