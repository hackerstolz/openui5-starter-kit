
// import UIComponent from 'sap/ui/core/UIComponent';
// import Device from 'sap/ui/Device';
// import models from 'ps/model/models';
// import configure from './store';

sap.ui.define([
  'sap/ui/core/UIComponent',
  'sap/ui/Device',
  'ps/model/models'
  // 'ps/store/index'
], function(UIComponent, Device, models) {

  return UIComponent.extend('ps.Component', {
// export default class Component extends UIComponent {

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

      // const store = configure();
      // store.subscribe(() =>  {
      //   console.log(store.getState());
      // });

    }
  });
});
