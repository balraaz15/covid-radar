import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import styles from './App.module.css';
import { Cards, Graph, CountryPicker, NavigationBar, DetailsPage } from './components';
import { getLatestData, getCountriesHistoricalData } from './api/api';

class App extends Component {

  state = {
    latestData: [],
    selectedCountry: '',
    countryHistory: '',
  }

  async componentDidMount() {
    const sc = localStorage.getItem('selectedCountry');
    if (sc) {
      const data = await getLatestData(sc);
      const countryHistoricalData = await getCountriesHistoricalData(sc, 30);
      this.setState({ latestData: data, selectedCountry: sc, countryHistory: countryHistoricalData });
    } else {
      const data = await getLatestData();
      this.setState({ latestData: data });
    }
  }

  handleCountrySelect = async (country = localStorage.getItem('myCountry')) => {
    const data = await getLatestData(country);
    const countryHistoricalData = await getCountriesHistoricalData(country, 30);

    if (country === 'All') {
      localStorage.setItem('selectedCountry', '');
      this.setState({ latestData: data, selectedCountry: '', countryHistory: '' });
    } else {
      localStorage.setItem('selectedCountry', country);
      this.setState({ latestData: data, selectedCountry: country, countryHistory: countryHistoricalData });
    }
  }

  render() {
    const { latestData, selectedCountry, countryHistory } = this.state;

    return (
      <div className={styles.App}>
        <NavigationBar />

        <Switch>
          <Route path="/details">
            <DetailsPage />
          </Route>
          <Route path="/">
            <Cards data={latestData} />
            <CountryPicker selected={selectedCountry} handleCountrySelect={this.handleCountrySelect} />
            <Graph data={countryHistory} country={selectedCountry} />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default App;
