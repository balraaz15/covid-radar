import React, { Fragment } from 'react';
import { Spinner } from '@blueprintjs/core';
import cx from 'classnames';

import styles from './Continent.module.css';

const Continent = props => {

	if (!props.data[0]) {
		return <Spinner intent="warning" />
	}

	const numberWithCommas = (data) => {
		return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	return (
		<Fragment>
			<table className={cx('bp3-html-table', 'bp3-html-table-striped', 'bp3-elevation-2', styles.table)}>
				<thead>
					<tr className={styles.tableHeading}>
						<th>Rank</th>
						<th>Country</th>
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
								<td>{i + 1}</td>
								<td title={d.country}>
									<img src={d.countryInfo.flag} width="20" className={styles.flag} alt={d.country} />
									{d.country.length > 15 ? d.country.slice(0, 15) + '...' : d.country}
								</td>
								<td>{numberWithCommas(d.cases)}</td>
								<td className={d.todayCases ? styles.todayCases : ''}>
									{d.todayCases ? '+' + numberWithCommas(d.todayCases) : ''}
								</td>
								<td>{numberWithCommas(d.deaths)}</td>
								<td className={d.todayDeaths ? styles.todayDeaths : ''}>
									{d.todayDeaths ? '+' + numberWithCommas(d.todayDeaths) : ''}
								</td>
								<td>
									{d.recovered ? numberWithCommas(d.recovered) : <span className={styles.notAvailable}>N/A</span>}
								</td>
								<td>
									{d.active ? numberWithCommas(d.active) : <span className={styles.notAvailable}>N/A</span>}
								</td>
								<td>{numberWithCommas(d.critical)}</td>
								<td>
									{d.tests ? numberWithCommas(d.tests) : <span className={styles.notAvailable}>N/A</span>}
								</td>
								<td>{numberWithCommas(d.population)}</td>
							</tr>) : <Spinner />
					}
				</tbody>
			</table>
		</Fragment >
	)
}

export default Continent;
