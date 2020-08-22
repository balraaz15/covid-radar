import React, { Fragment } from 'react';
import { Spinner } from '@blueprintjs/core';
import cx from 'classnames';

import DataCard from '../DataCard/DataCard';
import styles from './Continent.module.css';

const Continent = props => {

	if (!props.data[0]) {
		return <Spinner intent="warning" />
	}

	const numberWithCommas = (data) => {
		return data ? data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0';
	}

	return (
		<Fragment>
			{
				props.overall ?
					<div className={styles.continentCardList}>
						<DataCard title="cases" data={props.overall.cases} size="card-sm" />
						<DataCard title="deaths" data={props.overall.deaths} size="card-sm" />
						<DataCard title="recovered" data={props.overall.recovered} size="card-sm" />
						<DataCard title="todayCases" data={props.overall.todayCases} size="card-sm" />
						<DataCard title="todayDeaths" data={props.overall.todayDeaths} size="card-sm" />
					</div> : null
			}

			<table className={cx('bp3-html-table', 'bp3-html-table-striped', 'bp3-elevation-2', styles.table)}>
				<thead className={styles.tableHeading}>
					<tr>
						<th style={{width: '4.5vw'}}>Rank</th>
						<th style={{width: '12vw'}}>Country</th>
						<th>Total Cases</th>
						<th>Cases Today</th>
						<th>Total Deaths</th>
						<th>Deaths Today</th>
						<th>Total Recovered</th>
						<th>Active Cases</th>
						<th>Critical Cases</th>
						<th>Total Tests</th>
						<th>Total Population</th>
					</tr>
				</thead>

				<tbody>
					{
						props.data ?
							props.data.map((d, i) => <tr key={d.country} className={styles.countryRow}>
								<td data-label="Rank">{i + 1}</td>
								<td data-label="Country" title={d.country}>
									<img src={d.countryInfo.flag} width="20" className={styles.flag} alt={d.country} />
									{d.country}
								</td>
								<td data-label="Total Cases">{numberWithCommas(d.cases)}</td>
								<td data-label="Cases Today" className={d.todayCases ? styles.todayCases : ''}>
									{d.todayCases > 0 ? '+' + numberWithCommas(d.todayCases) : '0'}
								</td>
								<td data-label="Total Deaths">{numberWithCommas(d.deaths)}</td>
								<td data-label="Deaths Today" className={d.todayDeaths ? styles.todayDeaths : ''}>
									{d.todayDeaths > 0 ? '+' + numberWithCommas(d.todayDeaths) : '0'}
								</td>
								<td data-label="Total Recovered">
									{d.recovered ? numberWithCommas(d.recovered) : <span className={styles.notAvailable}>N/A</span>}
								</td>
								<td data-label="Active Cases">
									{d.active ? numberWithCommas(d.active) : <span className={styles.notAvailable}>N/A</span>}
								</td>
								<td data-label="Critical Cases">{numberWithCommas(d.critical)}</td>
								<td data-label="Total Tests">
									{d.tests ? numberWithCommas(d.tests) : <span className={styles.notAvailable}>N/A</span>}
								</td>
								<td data-label="Total Population">{numberWithCommas(d.population)}</td>
							</tr>) : <Spinner />
					}
				</tbody>
			</table>
		</Fragment >
	)
}

export default Continent;
