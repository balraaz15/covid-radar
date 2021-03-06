import React, { useState, useEffect } from 'react';
import { HTMLSelect, Button } from '@blueprintjs/core';

import styles from './CountryPicker.module.css';
import { getCountriesList } from '../../api/api';
import { getCountry } from '../helpers/reverse-geocoding/reverseGeocoding';

const CountryPicker = ({ handleCountrySelect, selectedCountry }) => {
	const [countries, setCountries] = useState([]);
	const [showMyCountry, setShowMyCountry] = useState(false);
	const [myCountry, setMyCountry] = useState('');

	useEffect(() => {
		const fetchCountries = async () => {
			setCountries(await getCountriesList());
		}
		fetchCountries();
	}, [setCountries]);

	const reverseGeocode = async () => {
		getCountry();
		setTimeout(() => {setMyCountry(localStorage.getItem('myCountry'))}, 2000);
		handleCountrySelect();
	}

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
				showMyCountry ?
					<Button className="bp3-minimal bp3-outlined" intent="primary" onClick={() => { handleCountrySelect('All'); setShowMyCountry(false) }}>Select Global</Button>
					: myCountry ?
						localStorage.getItem('selectedCountry') !== myCountry ?
							<Button className="bp3-minimal bp3-outlined" intent="primary" onClick={() => { handleCountrySelect(); setShowMyCountry(true) }}>Select My country</Button>
							: <Button className="bp3-minimal bp3-outlined" intent="primary" onClick={() => { handleCountrySelect('All'); setShowMyCountry(false) }}>Select Global</Button>
						: <Button className="bp3-minimal bp3-outlined" intent="primary" onClick={async () => { await reverseGeocode() }}>Set My Country</Button>
			}
		</div >
	)
}

export default CountryPicker;
