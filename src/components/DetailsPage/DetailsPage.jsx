import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Button } from "@blueprintjs/core";
import cx from 'classnames';
import { Link } from 'react-router-dom';

import styles from './DetailsPage.module.css';
import { getContinents, getCountriesData, getContinentData } from '../../api/api';
import Continent from '../Continents/Continent';

const DetailsPage = () => {
	const [latestData, setLatestData] = useState([]);
	const [continents, setContinents] = useState([]);
	const [continentData, setContinentData] = useState([]);

	useEffect(() => {
		const fetchContinents = async () => {
			setContinents(await getContinents());
			setLatestData(await getCountriesData());
		}
		fetchContinents();
	}, [setContinents]);

	const sortCountriesByCases = (first, second) => {
		if (first.cases < second.cases) {
			return 1;
		}
		if (first.cases > second.cases) {
			return -1;
		}
		return 0;
	}

	if (latestData) latestData.sort(sortCountriesByCases);

	const filterByContinent = async (continent) => {
		setContinentData(await getContinentData(continent));
	}

	const modifyLatestData = () => {
		const modifiedLatestData = latestData.filter((item) => continentData.countries.includes(item.country));
		setContinentData(modifiedLatestData);
	}
	if (continentData.countries) modifyLatestData();

	return (
		<div className={styles.Container}>
			<Tabs id="TabsExample" className={styles.tabs}>
				<Tab id="all" title="All Countries" panel={<Continent title="All Countries" data={latestData} />} />
				{
					continents ?
						continents.map((c, i) => <Tab
							onClickCapture={() => filterByContinent(c.continent)}
							key={c.continent.slice(0, 2)}
							id={i}
							title={c.continent}
							panel={<Continent data={continentData} />}
						/>
						) : null
				}

				<Button className={cx('bp3-minimal bp3-outlined', styles.homepage)} intent="primary">
					<Link to="/" className={styles.link}>Go to home page</Link>
				</Button>
			</Tabs>
		</div>
	)
}

export default DetailsPage;
