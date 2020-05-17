import React, { useState, useEffect } from 'react';
import { HTMLSelect, Button } from '@blueprintjs/core';

import styles from './CountryPicker.module.css';
import { getCountriesList } from '../../api/api';

const CountryPicker = ({ handleCountrySelect, selectedCountry }) => {
	const [countries, setCountries] = useState([]);
	const [showMyCountry, setShowMyCountry] = useState(false);

	useEffect(() => {
		const fetchCountries = async () => {
			setCountries(await getCountriesList());
		}
		fetchCountries();
	}, [setCountries]);

	return (
		<div className={styles.countryPicker}>
			<HTMLSelect fill={true} onChange={(e) => handleCountrySelect(e.target.value)} className={styles.select}>
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
			{
				localStorage.getItem('selectedCountry') !== 'Nepal' ?
					<Button className="bp3-minimal bp3-outlined" intent="primary" onClick={() => { handleCountrySelect('Nepal'); setShowMyCountry(!showMyCountry) }}>Select My country</Button>
					: <Button className="bp3-minimal bp3-outlined" intent="primary" onClick={() => { handleCountrySelect('All'); setShowMyCountry(!showMyCountry) }}>Select Global</Button>
			}
		</div>
	)
}

export default CountryPicker;
