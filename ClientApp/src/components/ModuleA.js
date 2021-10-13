import React, { Component } from 'react';
import Map from "@arcgis/core/Map";
import esriConfig from "@arcgis/core/config.js";
import MapView from "@arcgis/core/views/MapView";

export class ModuleA extends Component {
  constructor(props) {
    super(props);    
  }

    componentDidMount() {
        debugger;
        esriConfig.apiKey = "AAPKd40dc383645f4a9cba03b72eeaaf5435zYMlx3rd8sSxZNGXK8IK6OlWDYhjy2xKiz6FyRIaq2CwfMe25ld6Aryg2WB6m10X";
        var map = new Map({
            basemap: "arcgis-topographic" // Basemap layer service
        });
        var view  = new MapView({
            map: map,
            center: [-118.805, 34.027], // Longitude, latitude
            zoom: 13, // Zoom level
            container: "viewDiv" // Div element
        });
    }


  render() {
    return (
      <div>
        <h1>MODULE-A_Public Access</h1>

        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">ModuleA Loading <strong></strong></p>
            <div id="viewDiv" >
            
            </div>
       
      </div>
    );
  }
}

