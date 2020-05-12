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
    const data = await getLatestData();
    this.setState({ latestData: data });
  }

  handleCountrySelect = async (country) => {
    const data = await getLatestData(country);
    const countryHistoricalData = await getCountriesHistoricalData(country, 30);

    if (country === 'All') {
      this.setState({ latestData: data, selectedCountry: '', countryHistory: '' });
    } else {
      this.setState({ latestData: data, selectedCountry: country, countryHistory: countryHistoricalData });
    }
    console.log(country);
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
            <CountryPicker handleCountrySelect={this.handleCountrySelect} />
            <Graph data={countryHistory} country={selectedCountry} />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default App;
