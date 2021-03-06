import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import i18n from 'i18next';



const casesTypeColors = {
  cases: {
    hex: "#FF5722",
    multiplier: 800
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 800
  },
  deaths: {
    hex: "#f31a0a",
    multiplier: 2000
  },
};

export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const milliSecondsToDateTime = (s) => s?new Date(+s).toLocaleString('EN-GB'):'';

export const showDataOnMap = (data, casesType = "cases") =>{
let myStyle = {};

  if(i18n.dir() === 'rtl') {
    myStyle={
      textAlign: 'right'
    }
  }

  return data.map((country) => (
    <Circle
      key={country.key}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name" style={myStyle}>{country.country}</div>
          <div className="info-confirmed" style={myStyle}>
            {i18n.t('app:app.infobox.cases')}: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered" style={myStyle}>
          {i18n.t('app:app.infobox.recovered')}: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths" style={myStyle}>
          {i18n.t('app:app.infobox.deaths')}: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ))};