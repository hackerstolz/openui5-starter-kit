sap.ui.define([
  'sap/ui/core/UIComponent',
  'sap/ui/model/json/JSONModel',
  'ps/model/models',
  'ps/reducers/index',

  // load plug ins
  // 'ps/libs/redux' // exports Redux
], function(UIComponent, JSONModel, models, rootReducer) {

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

      // initialize the main model with initial state
      const oMainModel = new JSONModel(this.__store.getState());
      oMainModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
      this.setModel(oMainModel);

      // subscribe to store
      this.__store.subscribe(() =>  {

        // update main model with new state
        // TODO: check if only bindings with changed attribute values are updated
        this.getModel().setData( this.__store.getState() );

      });

    },

    getStore() {
      return this.__store;
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
