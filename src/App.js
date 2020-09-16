import { capitalize, Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import InfoBox from './components/InfoBox';
import LineGraph from './components/LineGraph';
import Map from './components/Map';
import Table from './components/Table';
import { prettyPrintStat, sortData } from './util';
import "leaflet/dist/leaflet.css";

//countries: https://disease.sh/v3/covid-19/countries

const casesColors = {
  'cases': "#FF5722",
  'recovered': "#7dd71d",
  'deaths': "#f31a0a"
}


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: 0 });
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setcasesType] = useState('cases');
  // const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    //effect
    (async () => {
      await fetch('https://disease.sh/v3/covid-19/all')
        .then(response => response.json())
        .then(data => {
          setCountryInfo(data);
          // setLastUpdate(data.updated);
        });
    })();
    return () => {
      //cleanup
    }
  }, [])

  useEffect(() => {
    //effect
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => (
            {
              name: country.country,
              value: country.countryInfo.iso3
            }
          ));
          const sortedData = sortData(data);
          setTableData(sortedData);

          setMapCountries(data)
          setCountries(countries);
          //setLastUpdate(data.updated);
        });
    };

    getCountriesData();
    return () => {
      //cleanup
    }
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = countryCode === 'worldwide'
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {

        setCountry(countryCode);
        //all data from the country response
        setCountryInfo(data);
        if (countryCode === 'worldwide') {
          setMapZoom(2);
          setMapCenter([34.80746, 0]);
        } else {
          setMapZoom(4);
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        }

        // setLastUpdate(data.updated);

      });
  };

  return (
    <Fragment>
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          {/* <div>
            
            <h4 className="author">By Haitham Elbaz</h4>
            <p className="last__update">{country === 'worldwide' ? 'Worldwide' :
              countries.filter(c => c.value === country)[0]?.name} Data Updated at
           &nbsp;{milliSecondsToDateTime(lastUpdate)}
            </p>
          </div> */}

          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country} >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(country => (
                <MenuItem key={country.name} value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__status">
          <InfoBox title="Coronavirus Cases"
            onClick={e => setcasesType('cases')}
            active={casesType === 'cases'}
            color={casesColors.cases}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)} />
          <InfoBox title="Recovered"
            onClick={e => setcasesType('recovered')}
            active={casesType === 'recovered'}
            color={casesColors.recovered}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)} />
          <InfoBox title="Deaths"
            onClick={e => setcasesType('deaths')}
            active={casesType === 'deaths'}
            color={casesColors.deaths}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)} />
        </div>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__rigth">
        <CardContent>
          <h3>Situation by Country</h3>
          <Table countries={tableData} />
          <h3 className="app__graphTitle">{country === 'worldwide' ? 'Worldwide' : countries.filter(c => c.value === country)[0]?.name} {capitalize(casesType)} In 120 days</h3>
          <LineGraph country={country} caseType={casesType} graphBGColor={casesColors[casesType]} className="app__graph" />
        </CardContent>
      </Card>
    </div>
      <div id="footer">
		<p>Haitham Elbaz © 2020</p>
	</div>
  </Fragment>
  );
}

export default App;
