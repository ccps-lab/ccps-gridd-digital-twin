import React, { useEffect, useRef, useState, ReactDOM } from "react";
import { useLocation } from "react-router-dom";
import { BaseApp } from "forge-dataviz-iot-react-components";
import DataHelper from "./DataHelper";
import { EventTypes } from "forge-dataviz-iot-react-components";

import {
    SpriteSize,
    SensorStyleDefinitions,
    PropIdGradientMap,
    PropertyIconMap,
} from "../config/SensorStyles.js";

import "forge-dataviz-iot-react-components/dist/main.bundle.css";

const surfaceShadingConfig = {
    spriteSize: SpriteSize,
    deviceStyles: SensorStyleDefinitions,
    gradientSetting: PropIdGradientMap,
};

class EventBus { }

THREE.EventDispatcher.prototype.apply(EventBus.prototype);

/**
 * An example of a complete application utilizing all features of the Data Visualization extension. Can be viewed at https://hyperion.autodesk.io/
 *
 * @component
 * @param {Object} props
 * @param {Object} props.appData Data passed to the BaseApp.
 * @param {("AutodeskStaging"|"AutodeskProduction")} props.appData.env Forge API environment
 * @param {string} props.appData.docUrn Document URN of model
 * @param {string} props.appData.adapterType Corresponds to Data Adapter used to query data. i.e - synthetic, azure etc.
 * @param {"derivativeV2"|"derivativeV2_EU"|"modelDerivativeV2"|"fluent"|"D3S"|"D3S_EU"} [props.appData.api] Please refer to LMV documentation for more information.
 * @param {string} [props.appData.dataStart] Start date for provided CSV data in ISO string format.
 * @param {string} [props.appData.dataEnd] End date for provided CSV data in ISO string format.
 * @param {Object} props.appContext Contains base urls used to query assets, LMV, data etc.
 * @param {string} [props.appContext.dataUrl] The base url used to configure a specific {@link DataAdapter}
 * @param {number|undefined} geomIndex Index of geometry to be shown. Forwarded via URL params.
 *
 * @memberof Autodesk.DataVisualization.Examples
 */
function ReferenceApp(props) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const geomIndex = queryParams.get("geometryIndex") ?
        parseInt(queryParams.get("geometryIndex")) :
        undefined;

    const eventBusRef = useRef(new EventBus());
    const [data, setData] = useState(null);

    const dataRef = useRef();
    const viewerRef = useRef(null);
    const appStateRef = useRef({});
    const leafNodesRef = useRef([]);

    const renderSettings = {
        showViewables: true,
        occlusion: false,
        showTextures: true,
        heatmapType: "GeometryHeatmap",
    };


    // *******************************************
    // Docking Panel
    // *******************************************
    function setPanelStyle(container) {
        container.classList.add('docking-panel-container-solid-color-a');
        container.style.position = "absolute";
        container.style.top = "20%";
        container.style.left = "30%";
        container.style.width = "60%";
        container.style.height = "80%";
        container.style.resize = "auto";
    }

    function addPanelContent(container) {
        // panel content
        var iframe = document.createElement('iframe');
        // PowerBI link
        var link = "https://app.powerbi.com/view?r=eyJrIjoiMjM0NWIxMzktNWMzNC00YmM0LTg4M2UtZmI5Y2I3NWQ2MjU2IiwidCI6IjY3YTFhZDVjLTQ2YzAtNGQ5My05ZWMwLTAyOGM2NDhjYTdmMSJ9"
        //add style
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.setAttribute("src", link);
        container.appendChild(iframe);
    }

    function initNewPanel(viewer, container, id, title, options) {
        this.viewer = viewer;
        // Initializing the panel
        Autodesk.Viewing.UI.DockingPanel.call(this, container, id, title, options);

        // Setting style of the docking panel
        setPanelStyle(this.container)

        // Setting content of the docking panel
        addPanelContent(this.container)
    }


    //defining constructor for createNewPanel
    initNewPanel.prototype = Object.create(Autodesk.Viewing.UI.DockingPanel.prototype);
    initNewPanel.prototype.constructor = initNewPanel;

    // *******************************************
    // create Extension for add button to toolbar 
    // *******************************************
    function initExtension(viewer, options) {
        Autodesk.Viewing.Extension.call(this, viewer, options);
        this.panel = null;
    }

    initExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
    initExtension.prototype.constructor = initExtension;

    initExtension.prototype.load = function () {
        if (this.viewer.toolbar) {
            // Toolbar is already available, create the UI
            this.createUI();
        } else {
            // Toolbar hasn't been created yet, wait until we get notification of its creation
            this.onToolbarCreatedBinded = this.onToolbarCreated.bind(this);
            this.viewer.addEventListener(av.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
        }
        return true;
    };

    //after the toolbar has been created 
    // initExtension.prototype.onToolbarCreated = function() {
    //     this.onToolbarCreatedBinded = null;
    //     this.createUI();
    // };


    initExtension.prototype.createUI = function () {
        var viewer = this.viewer;
        var panel = this.panel;

        // button to show the docking panel
        var toolbarButtonShowDockingPanel = new Autodesk.Viewing.UI.Button('showPanel');


        //////////////////////////////////////////////////////////////

        toolbarButtonShowDockingPanel.onClick = function (e) {
            // if null, create it
            if (panel == null) {
                panel = new initNewPanel(viewer, viewer.container,
                    'extensionPanel', 'Thermal Comfort');
            }
            // show/hide docking panel
            panel.setVisible(!panel.isVisible());
        };


        //add css to button from main.scss
        toolbarButtonShowDockingPanel.addClass('newToolbarButton');
        toolbarButtonShowDockingPanel.setToolTip('show panel');

        // SubToolbar
        this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('MyAwesomeAppToolbar');
        this.subToolbar.addControl(toolbarButtonShowDockingPanel);

        viewer.toolbar.addControl(this.subToolbar);

        const DataVizCore = Autodesk.DataVisualization.Core;
        viewer.addEventListener(DataVizCore.MOUSE_CLICK, onSpriteClicked);

        function onSpriteClicked(e) {

            if (e.dbId != 0) {
                var panel = this.panel;
                if (!panel) {
                    panel = new initNewPanel(viewer, viewer.container, 'extensionPanel', 'Thermal Comfort');
                    this.panel = panel; // Store panel instance in 'this' context
                }
                panel.setVisible(true);
                console.log(`Sprite clicked: ${e.dbId}`);
            }
            // Register event handlers for event.

        }

    };

    initExtension.prototype.unload = function () {
        this.viewer.toolbar.removeControl(this.subToolbar);
        return true;
    };

    Autodesk.Viewing.theExtensionManager.registerExtension('initExtension', initExtension);


    useEffect(() => {
        document.title = "GRIDD Digital Twins - CCPS";
        eventBusRef.current.addEventListener(EventTypes.MODEL_LOAD_COMPLETED, async function (
            event
        ) {
            viewerRef.current = event.data.viewer;
            let viewer = viewerRef.current;

            viewer.loadExtension('initExtension', { param1: 'value1' });
            let model = event.data.data.model;

            let levelsExt = null;

            let viewerDocument = model.getDocumentNode().getDocument();
            const aecModelData = await viewerDocument.downloadAecModelData();

            if (aecModelData) {
                levelsExt = await viewer.loadExtension("Autodesk.AEC.LevelsExtension", {
                    doNotCreateUI: true,
                });
            }

            /**
             * Empty event to show how to use the EventBus
             */
            const DataVizCore = Autodesk.DataVisualization.Core;

            eventBusRef.current.addEventListener(DataVizCore.MOUSE_CLICK, function ( /* event */) {
                // console.log("Received sprite click", event);
                // event.hasStopped = true;
            });
            eventBusRef.current.addEventListener(DataVizCore.MOUSE_HOVERING, function ( /* event */) {
                // console.log("Received sprite click", event);
                // event.hasStopped = true;
                // Stop event propagation to prevent other event listeners from handling the event
            });
            // Bind 'this' context to the event listener function
            // Subscribe to the DEVICE_TREE_EXPAND_EVENT



            /**
             * Called when a user has selected a grouping in the {@link HyperionToolContainer} or expanded/closed a
             * grouping in {@link DeviceTree}
             * @param {Event} event
             */




            function handleNodeChange(event) {
                if (levelsExt) {
                    let { selectedNodeId } = appStateRef.current;
                    let floorSelector = levelsExt.floorSelector;

                    if (selectedNodeId && selectedNodeId == event.data.id) {
                        floorSelector.selectFloor();
                        appStateRef.current = {
                            selectedNodeId: null,
                        };
                    } else {
                        if (floorSelector.floorData) {
                            let floor = floorSelector.floorData.find(
                                (item) => item.name == event.data.id
                            );
                            if (floor) {
                                floorSelector.selectFloor(floor.index, true);

                                appStateRef.current = {
                                    selectedNodeId: event.data.id,
                                };
                            }
                        }
                    }
                }
            }

            eventBusRef.current.addEventListener(
                EventTypes.GROUP_SELECTION_MOUSE_CLICK,
                handleNodeChange
            );
            eventBusRef.current.addEventListener(
                EventTypes.DEVICE_TREE_EXPAND_EVENT,
                handleNodeChange
            );

            eventBusRef.current.addEventListener(EventTypes.GROUP_SELECTION_MOUSE_OUT, (event) => {
                let floorSelector = levelsExt.floorSelector;

                if (floorSelector.floorData) {
                    let floor = floorSelector.floorData.find((item) => item.name == event.data.id);
                    if (floor) {
                        floorSelector.rollOverFloor();
                        viewer.impl.invalidate(false, false, true);
                    }
                }
            });

            eventBusRef.current.addEventListener(EventTypes.GROUP_SELECTION_MOUSE_OVER, (event) => {
                let floorSelector = levelsExt.floorSelector;
                if (floorSelector.floorData) {
                    let floor = floorSelector.floorData.find((item) => item.name == event.data.id);
                    if (floor) {
                        floorSelector.rollOverFloor(floor.index);
                        viewer.impl.invalidate(false, false, true);
                    }
                }
            });

            let session = event.data.session;
            /////////// device list ----> sensor types -----> ['Temperature', 'Humidity', 'CO₂']
            let devicesList = session.dataStore.deviceModels[0].devices;
            ///////////////my code
            //let device = devicesList[4]
            console.log(event)
            //room data
            //session.DeviceData

            //device.sensorTypes = device.sensorTypes.concat('sensorType1');


            let dataHelper = new DataHelper();
            let shadingData = await dataHelper.createShadingGroupByFloor(
                viewer,
                model,
                devicesList
            );
            let devicePanelData = dataHelper.createDeviceTree(shadingData, false);

            shadingData.getChildLeafs(leafNodesRef.current);

            dataRef.current = {
                shadingData,
                devicePanelData,
            };
            setData(dataRef.current);
        });
    }, []);

    return (
        <React.Fragment>
            <BaseApp
                {...props}
                eventBus={eventBusRef.current}
                data={data}
                renderSettings={renderSettings}
                surfaceShadingConfig={surfaceShadingConfig}
                propertyIconMap={PropertyIconMap}
                geomIndex={geomIndex}
            />
        </React.Fragment>
    );
}

export default ReferenceApp;