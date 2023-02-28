import React, { memo, useEffect, useRef, useState } from "react";
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

//import DeviceStats from "../components/DataStats";



class EventBus {}

THREE.EventDispatcher.prototype.apply(EventBus.prototype);

/**
 * An example illustrating how to render a heatmap using groups of dbIds. Can be viewed at https://hyperion.autodesk.io/engine
 * @component
 * @param {Object} props
 * @param {Object} props.appData Data passed to the EngineSimulation.
 * @param {("AutodeskStaging"|"AutodeskProduction")} props.appData.env Forge API environment
 * @param {string} props.appData.docUrn Document URN of model
 * @param {string} props.appData.adapterType Corresponds to Data Adapter used to query data. i.e - synthetic, azure etc.
 * @param {"derivativeV2"|"derivativeV2_EU"|"modelDerivativeV2"|"fluent"|"D3S"|"D3S_EU"} [props.appData.api] Please refer to LMV documentation for more information.
 * @param {Object} props.appContext Contains base urls used to query assets, LMV, data etc.
 * @param {string} [props.appContext.dataUrl] The base url used to configure a specific {@link DataAdapter}
 * @param {number|undefined} geomIndex Index of geometry to be shown. Forwarded via URL params.
 * @memberof Autodesk.DataVisualization.Examples
 */
function EngineSimulation(props) {
  const eventBusRef = useRef(new EventBus());
  const [data, setData] = useState(null);

  const dataRef = useRef();
  const viewerRef = useRef(null);
  const leafNodesRef = useRef([]);

  const queryParams = new URLSearchParams(useLocation().search);
  const geomIndex = queryParams.get("geometryIndex")
    ? parseInt(queryParams.get("geometryIndex"))
    : undefined;

  // props.appData.docUrn =
  //     "urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Zm9yZ2V0X2h5cGVyaW9uX3Rlc3QvRW5naW5lX1N0YW5kLmR3Zg";
  // props.appData.adapterType = "csv";

  useEffect(() => {
    eventBusRef.current.addEventListener(
      EventTypes.MODEL_LOAD_COMPLETED,
      async function (event) {
        viewerRef.current = event.data.viewer;
        let viewer = viewerRef.current;

        let model = event.data.data.model;
        let dataHelper = new DataHelper();

        //CCPS modification: for create dynamic device list.

        let session = event.data.session;
        let devicesList = session.dataStore.deviceModels[0].devices;

       

        let rawData = [];

        let objList = {
          id: "engine-1",
          dbIds: [ 5712, 5719, 5776, 5780],
          sensors: [],
        };

        devicesList.forEach((element) => {
          console.log("element:", element);
          objList.sensors.push({
            id: element.id,
            name: element.name,
            position: element.position,
            // sensorTypes: [element.sensorTypes[0]],
            type: "combo",
            sensorTypes: element.sensorTypes,
            
            //styleId: element.styleId || element.type,
            
          });
        });

        rawData.push(objList);

        console.log("Device List: ", devicesList);
        console.log("Sensors list: ", rawData);

        let shadingData = await dataHelper.createShadingData(
          viewer,
          model,
          rawData
        );

        let devicePanelData = dataHelper.createDeviceTree(shadingData, true);
        //shadingData.getChildLeafs(leafNodesRef.current);

        dataRef.current = {
          shadingData,
          devicePanelData,
        };
        setData(dataRef.current);
      }
    );
  }, []);

  return (
    <React.Fragment>
      <BaseApp
        {...props}
        eventBus={eventBusRef.current}
        data={data}
        geomIndex={geomIndex}
        propertyIconMap={PropertyIconMap}
        
      />
    </React.Fragment>
  );
}

export default EngineSimulation;
