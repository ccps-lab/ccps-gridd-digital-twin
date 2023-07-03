import React, { useEffect, useRef, useState, ReactDOM } from "react";
import { useLocation } from "react-router-dom";
import { BaseApp } from "forge-dataviz-iot-react-components";
import DataHelper from "./DataHelper";
import { EventTypes } from "forge-dataviz-iot-react-components";
import adskLogoSvg from "../../assets/images/forge-logo-digital-twin.svg"
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

    function addPanelContent(container, link) {
        // panel content
        var iframe = document.createElement('iframe');
        // PowerBI link
        var link = link;
        //add style
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.setAttribute("src", link);
        container.appendChild(iframe);
    }

    //1
    function init_A_1544_panel(viewer, container, id, title, options) {
        this.viewer = viewer;
        // Initializing the panel
        Autodesk.Viewing.UI.DockingPanel.call(this, container, id, title, options);

        // Setting style of the docking panel
        setPanelStyle(this.container)
        var powerBILink = "https://app.powerbi.com/view?r=eyJrIjoiN2QxMGY0ODctM2QyYS00NDk0LThhY2UtMjAxNDBhYzc1ODYxIiwidCI6IjY3YTFhZDVjLTQ2YzAtNGQ5My05ZWMwLTAyOGM2NDhjYTdmMSJ9"
        // Setting content of the docking panel
        addPanelContent(this.container, powerBILink)
    }
    //defining constructor for createNewPanel
    init_A_1544_panel.prototype = Object.create(Autodesk.Viewing.UI.DockingPanel.prototype);
    init_A_1544_panel.prototype.constructor = init_A_1544_panel;


    //2
    function init_A_1544_2_panel(viewer, container, id, title, options, dbId) {
        this.viewer = viewer;
        // Initializing the panel
        Autodesk.Viewing.UI.DockingPanel.call(this, container, id, title, options);

        // Setting style of the docking panel
        setPanelStyle(this.container)
        var powerBILink = "https://app.powerbi.com/view?r=eyJrIjoiM2ZkZDE2MzAtMDcyYy00MGJmLWI5ZjUtYWMzZGRjMTAyZTUwIiwidCI6IjY3YTFhZDVjLTQ2YzAtNGQ5My05ZWMwLTAyOGM2NDhjYTdmMSJ9"
        // Setting content of the docking panel
        addPanelContent(this.container, powerBILink)
    }
    //defining constructor for createNewPanel
    init_A_1544_2_panel.prototype = Object.create(Autodesk.Viewing.UI.DockingPanel.prototype);
    init_A_1544_2_panel.prototype.constructor = init_A_1544_2_panel;


//3
function init_A_1540_panel(viewer, container, id, title, options) {
    this.viewer = viewer;
    // Initializing the panel
    Autodesk.Viewing.UI.DockingPanel.call(this, container, id, title, options);

    // Setting style of the docking panel
    setPanelStyle(this.container)
    var powerBILink = "https://app.powerbi.com/view?r=eyJrIjoiMDkyMGIzOTktYzY4Mi00NmUxLWI3MWYtZTQyODYwMTk5NDRjIiwidCI6IjY3YTFhZDVjLTQ2YzAtNGQ5My05ZWMwLTAyOGM2NDhjYTdmMSJ9&pageName=ReportSection"
    // Setting content of the docking panel
    addPanelContent(this.container, powerBILink)
}
//defining constructor for createNewPanel
init_A_1540_panel.prototype = Object.create(Autodesk.Viewing.UI.DockingPanel.prototype);
init_A_1540_panel.prototype.constructor = init_A_1540_panel;



//4
function init_A_1542_panel(viewer, container, id, title, options) {
    this.viewer = viewer;
    // Initializing the panel
    Autodesk.Viewing.UI.DockingPanel.call(this, container, id, title, options);

    // Setting style of the docking panel
    setPanelStyle(this.container)
    var powerBILink = "https://app.powerbi.com/view?r=eyJrIjoiMzgzMjU4ZjItZTQwNS00YTBhLWJiODgtNTE2N2JlNDZlZGQzIiwidCI6IjY3YTFhZDVjLTQ2YzAtNGQ5My05ZWMwLTAyOGM2NDhjYTdmMSJ9"
    // Setting content of the docking panel
    addPanelContent(this.container, powerBILink)
}
//defining constructor for createNewPanel
init_A_1542_panel.prototype = Object.create(Autodesk.Viewing.UI.DockingPanel.prototype);
init_A_1542_panel.prototype.constructor = init_A_1542_panel;


//5
function init_A_1544_1_panel(viewer, container, id, title, options) {
    this.viewer = viewer;
    // Initializing the panel
    Autodesk.Viewing.UI.DockingPanel.call(this, container, id, title, options);

    // Setting style of the docking panel
    setPanelStyle(this.container)
    var powerBILink = "https://app.powerbi.com/view?r=eyJrIjoiNzUxMzc3OWMtNWFkNi00YmY3LTgyMTUtMjdkZWRkNmRlYjdlIiwidCI6IjY3YTFhZDVjLTQ2YzAtNGQ5My05ZWMwLTAyOGM2NDhjYTdmMSJ9"
    // Setting content of the docking panel
    addPanelContent(this.container, powerBILink)
}
//defining constructor for createNewPanel
init_A_1544_1_panel.prototype = Object.create(Autodesk.Viewing.UI.DockingPanel.prototype);
init_A_1544_1_panel.prototype.constructor = init_A_1544_1_panel;



//6
function init_BigRoom_2_panel(viewer, container, id, title, options) {
    this.viewer = viewer;
    // Initializing the panel
    Autodesk.Viewing.UI.DockingPanel.call(this, container, id, title, options);

    // Setting style of the docking panel
    setPanelStyle(this.container)
    var powerBILink = "https://app.powerbi.com/view?r=eyJrIjoiZGNiZjU4YmQtMTUzNS00YmQ4LWI2YjMtMDk0Zjg4MmJiMzViIiwidCI6IjY3YTFhZDVjLTQ2YzAtNGQ5My05ZWMwLTAyOGM2NDhjYTdmMSJ9"
    // Setting content of the docking panel
    addPanelContent(this.container, powerBILink)
}
//defining constructor for createNewPanel
init_BigRoom_2_panel.prototype = Object.create(Autodesk.Viewing.UI.DockingPanel.prototype);
init_BigRoom_2_panel.prototype.constructor = init_BigRoom_2_panel;


    //Occupancy
    function addOccypancyPanelContent(container) {
        // panel content
        var iframe = document.createElement('iframe');
        // PowerBI link
        var link = "https://app.powerbi.com/view?r=eyJrIjoiMzE3NWNhNmYtNjEzYS00NjQ3LTg1NGUtOGNiODI3ZWYxODU1IiwidCI6IjY3YTFhZDVjLTQ2YzAtNGQ5My05ZWMwLTAyOGM2NDhjYTdmMSJ9&pageName=ReportSection"
        //add style
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.setAttribute("src", link);
        container.appendChild(iframe);
    }
    function initOccupancyPanel(viewer, container, id, title, options) {
        this.viewer = viewer;
        // Initializing the panel
        Autodesk.Viewing.UI.DockingPanel.call(this, container, id, title, options);

        // Setting style of the docking panel
        this.container.classList.add('docking-panel-container-solid-color-a');
        this.container.style.position = "absolute";
        this.container.style.top = "20%";
        this.container.style.left = "30%";
        this.container.style.width = "50%";
        this.container.style.height = "50%";
        this.container.style.resize = "auto";
        // Setting content of the docking panel
        addOccypancyPanelContent(this.container)
    }
    //defining constructor for createNewPanel
    initOccupancyPanel.prototype = Object.create(Autodesk.Viewing.UI.DockingPanel.prototype);
    initOccupancyPanel.prototype.constructor = initOccupancyPanel;




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
        toolbarButtonShowDockingPanel.icon.style.backgroundImage = 'url(data:image/png;base64,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)';
        toolbarButtonShowDockingPanel.icon.style.backgroundSize = 'contain'; // Fit the icon within the button
        toolbarButtonShowDockingPanel.icon.style.backgroundRepeat = 'no-repeat'; // Prevent icon repetition
        toolbarButtonShowDockingPanel.icon.style.backgroundPosition = 'center'; // Center the icon within the button
        toolbarButtonShowDockingPanel.icon.style.width = '24px'; // Set the desired width of the icon
        toolbarButtonShowDockingPanel.icon.style.height = '24px'; // Set the desired height of the icon
        //////////////////////////////////////////////////////////////

        toolbarButtonShowDockingPanel.onClick = function (e) {
            // if null, create it
            if (panel == null) {
                panel = new initOccupancyPanel(viewer, viewer.container,
                    'Occupancy', 'Occupancy');
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
                switch (e.dbId) {
                    case 1:
                        var panel = this.panel;
                        panel = new init_A_1544_panel(viewer, viewer.container, 'A-1540', 'Thermal Comfort');
                        this.panel = panel; // Store panel instance in 'this' context
                        panel.setVisible(true);
                        break;
                    case 2:
                        var panel = this.panel;
                        panel = new init_A_1544_2_panel(viewer, viewer.container, 'A_1544_2', 'Thermal Comfort');
                        this.panel = panel; // Store panel instance in 'this' context
                        panel.setVisible(true);
                        break;
                    case 3:
                        var panel = this.panel;
                        panel = new init_A_1540_panel(viewer, viewer.container, 'A_1540', 'Thermal Comfort');
                        this.panel = panel; // Store panel instance in 'this' context
                        panel.setVisible(true);
                        break;
                    case 4:
                        var panel = this.panel;
                        panel = new init_A_1542_panel(viewer, viewer.container, 'A_1542', 'Thermal Comfort');
                        this.panel = panel; // Store panel instance in 'this' context
                        panel.setVisible(true);
                        break;
                    case 5:
                        var panel = this.panel;
                        panel = new init_A_1544_1_panel(viewer, viewer.container, 'A_1544_1', 'Thermal Comfort');
                        this.panel = panel; // Store panel instance in 'this' context
                        panel.setVisible(true);
                        break;
                    case 6:
                        var panel = this.panel;
                        panel = new init_BigRoom_2_panel(viewer, viewer.container, 'BigRoom_2', 'Thermal Comfort');
                        this.panel = panel; // Store panel instance in 'this' context
                        panel.setVisible(true);
                        break;
                    default:
                        break;
                }
                //console.log(`Sprite clicked: ${e.dbId}`);
            }
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
            <img className="logo" src={adskLogoSvg} alt="Autodesk Logo" />
        </React.Fragment>
    );
}

export default ReferenceApp;