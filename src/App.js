import { Button, Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import InfoBox from './components/InfoBox';
import LineGraph from './components/LineGraph';
import Map from './components/Map';
import Table from './components/Table';
import { prettyPrintStat, sortData } from './util';
import "leaflet/dist/leaflet.css";
import { useTranslation } from 'react-i18next';
import withRoot from './withRoot';
import { useTheme } from '@material-ui/core/styles';


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
  const { t, i18n } = useTranslation('app');
  const theme = useTheme();

  document.body.dir = i18n.dir();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    document.body.dir = i18n.dir();
    theme.direction = i18n.dir();
  }

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
              name: country.country.replace(".", ""),
              value: country.countryInfo.iso3
            }
          ));
          const sortedData = sortData(data);
          setTableData(sortedData);

          setMapCountries(data);
          // console.log(countries.map(c=>c.name));
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
        <div className="lang-change">
        <Button onClick={() => changeLanguage('ar')} className={`ar-lang ${i18n.language==='en'?'active':''}`} >اللغة العربية</Button>/
        <Button onClick={() => changeLanguage('en')} className={`en-lang ${i18n.language==='ar'?'active':''}`}>English</Button>
        </div>
      <div className="app">
        <div className="app__left">
          <div className="app__header">
            <h1>{t('app.title')}</h1>
            {/* <div>
            
            <h4 className="author">By Haitham Elbaz</h4>
            <p className="last__update">{country === 'worldwide' ? 'Worldwide' :
              countries.filter(c => c.value === country)[0]?.name} Data Updated at
           &nbsp;{milliSecondsToDateTime(lastUpdate)}
            </p>
          </div> */}

            <FormControl className="app__dropdown">
              <Select variant="outlined" onChange={onCountryChange} value={country} >
                <MenuItem value="worldwide">{t('app.countries.Worldwide')}</MenuItem>
                {countries.map(country => (
                  <MenuItem key={country.name} value={country.value}>{t(`app.countries.${country.name}`)}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="app__status">
            <InfoBox title={t("app.infobox.cases")}
              onClick={e => setcasesType('cases')}
              active={casesType === 'cases'}
              color={casesColors.cases}
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={prettyPrintStat(countryInfo.cases)} />
            <InfoBox title={t("app.infobox.recovered")}
              onClick={e => setcasesType('recovered')}
              active={casesType === 'recovered'}
              color={casesColors.recovered}
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={prettyPrintStat(countryInfo.recovered)} />
            <InfoBox title={t("app.infobox.deaths")}
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
            <h3>{t('app.Situation')}</h3>
            <Table countries={tableData} />
            <h3 className="app__graphTitle">{t('app.graphtitle', {type: t(`app.infobox.${casesType}`), name: t(`app.countries.${country === 'worldwide' ? 'Worldwide' : countries.filter(c => c.value === country)[0]?.name}`)} )}</h3>
            <LineGraph country={country} caseType={casesType} graphBGColor={casesColors[casesType]} className="app__graph" />
          </CardContent>
        </Card>
      </div>
      <div id="footer">
        <p>{t('app.copyrigth')}</p>
      </div>
    </Fragment>
  );
}

export default withRoot(App);