import React from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";

import allStates from "./allStates.json";
import { popular_city, popular_flights, popular_museum } from './data';


const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21]
};

const MapChart = (props) => {
  const markers = props.markers;
  console.log('markers:', markers);
  
  const m = markers.map(({ name, coordinates, markerOffset }) => (
    <Marker key={name} coordinates={coordinates}>
      <g
        fill="none"
        stroke="#FF5533"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(-12, -24)"
      >
        <circle cx="12" cy="10" r="3" />
        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
      </g>
      <text
        textAnchor="middle"
        y={markerOffset}
        style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: 'small' }}
      >
        {name}
      </text>
    </Marker>
  ))
  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map((geo) =>
              (<Geography
                key={geo.rsmKey}
                stroke="#FFF"
                geography={geo}
                fill="#DDD"
              />)
            )}
          </>
        )}
      </Geographies>
      {m}
    </ComposableMap>
  );
};

export default MapChart;
