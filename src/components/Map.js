import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "../util";
import { useTranslation } from "react-i18next";

const Map=({ countries, casesType, center, zoom })=> {
  // console.log(countries)
  const { t } = useTranslation ('app');
  // const tCountries = countries.map(({country, countryInfo, cases ,deaths ,recovered})=>{
  //   return {country : t(`app.countries.${country}`), countryInfo, cases ,deaths ,recovered, key: country};
  // });
  // console.log('countries',countries);
  // console.log('tCountries',tCountries);
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap = 'true'
          minZoom = '1.4'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries.map(({country, countryInfo, cases ,deaths ,recovered})=>{
    return {country : t(`app.countries.${country}`), countryInfo, cases ,deaths ,recovered, key: country};
  }), casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;