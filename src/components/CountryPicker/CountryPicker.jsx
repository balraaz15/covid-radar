import React, { useState, useEffect } from 'react';
import { HTMLSelect } from '@blueprintjs/core';

import styles from './CountryPicker.module.css';
import { getCountriesList } from '../../api/api';

const CountryPicker = ({ handleCountrySelect, selectedCountry }) => {
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		const fetchCountries = async () => {
			setCountries(await getCountriesList());
		}
		fetchCountries();
	}, [setCountries]);

	return (
		<div className={styles.countryPicker}>
			<HTMLSelect fill={true} onChange={(e) => handleCountrySelect(e.target.value)}>
				<option value="All">Global Data (Select a country)</option>
				{
					countries.map((c, i) => <option
						key={i}
						value={c.country}
						selected={localStorage.getItem('selectedCountry') === c.country ? 'selected' : ''}>
						{c.country}
					</option>)
				}
			</HTMLSelect>
		</div>
	)
}

export default CountryPicker;
