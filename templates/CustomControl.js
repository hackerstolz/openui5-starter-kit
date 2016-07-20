/**
 * 
 * Search and replace the following constants:
 * 
 * {year} e.g. 2016
 * {owner} e.g. MyCompany AG
 * {developer} e.g. Jascha Quintern
 * {today} e.g. 20.07.2016
 * {control} e.g. Button
 * {description} e.g. a Button that can be clicked
 * {lib} e.g. my.lib.ui
 * {version} usually you start with 1.0.0
 *
 */

/**
 * UI development toolkit enhancement for HTML5 (OpenUI5)
 * (c) Copyright {year} {owner}, all rights reserved.
 * Created by {developer} on {today}.
 */
sap.ui.define([
        "sap/ui/core/Control",
        "./library"
    ],
    function(Control, library) {

        "use strict";

        /**
         * Constructor for a new <code>{lib}.{control}</code>.
         *
         * @param {string} [sId] Id for the new control, generated automatically if no id is given
         * @param {object} [mSettings] Initial settings for the new control
         *
         * @class
         * The <code>{control}</code> control: {description}.
         *
         * @extends sap.ui.core.Control
         *
         * @author {owner}
         * @version {version}
         *
         * @constructor
         * @public
         * @alias {lib}.{control}
         */
        var {control} = Control.extend("{lib}.{control}", {            

            /* =========================================================== */
            /* meta data definition                                        */
            /* =========================================================== */

            metadata: {
                library: "{lib}",
                properties: {},
                aggregations: {},
                associations: {},
                events: {}
            },

            /* =========================================================== */
            /* private attributes                                          */
            /* =========================================================== */


            /* =========================================================== */
            /* lifecycle methods                                           */
            /* =========================================================== */

            constructor: function() {
                Control.prototype.constructor.apply( this, arguments );
            },

            /** 
             * The init() method can be used to set up, for example, internal variables or subcontrols of a composite control.
             * If the init() method is implemented, SAPUI5 invokes the method for each control instance directly after the constructor method.
             * @private
             * @override
             */
            init: function() {
                Control.prototype.init.apply( this, arguments );
            },

            /**
             * Method called before control gets rendered
             * @private
             * @override
             */
            onBeforeRendering: function() {
                Control.prototype.onBeforeRendering.apply( this, arguments );
            },

            renderer: function(oRm, oControl) {

                // start render wrapper div
                oRm.write("<div");
                oRm.writeControlData(oControl);
                oRm.addClass({control}.CSS_CLASS);
                oRm.writeClasses();
                oRm.write(">");

                // end render wrapper div
                oRm.write("</div>");

            },

            /**
             * Method called after control gets rendered
             * @private
             * @override
             */
            onAfterRendering: function() {
                Control.prototype.onAfterRendering.apply( this, arguments );
            },

            /** 
             * The exit() method is used to clean up resources and to deregister event handlers.
             * If the exit() method is implemented, SAPUI5 core invokes the method for each control instance when it is destroyed.
             * @private
             * @override
             */
            exit: function() {
                Control.prototype.exit.apply( this, arguments );
            }

        });


        /* =========================================================== */
        /* constants                                                   */
        /* =========================================================== */

        /**
         * The base CSS class name of control <code>{control}</code>.
         * @private
         * @type {string}
         */
        {control}.CSS_CLASS = "{lib}-{control}";


        /* =========================================================== */
        /* public methods                                              */
        /* =========================================================== */


        /* =========================================================== */
        /* override methods                                            */
        /* =========================================================== */


        /* =========================================================== */
        /* private methods                                             */
        /* =========================================================== */

        return {control};

    }, /* bExport= */ true);
