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
					<tr>
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
							props.data.map((d, i) => <tr key={d.country}>
								<td>{i + 1}</td>
								<td title={d.country}>
									<img src={d.countryInfo.flag} width="20" className={styles.flag} alt={d.country} />
									{d.country.length > 15 ? d.country.slice(0, 15) + '...' : d.country}
								</td>
								<td>{numberWithCommas(d.cases)}</td>
								<td>{numberWithCommas(d.todayCases)}</td>
								<td>{numberWithCommas(d.deaths)}</td>
								<td>{numberWithCommas(d.todayDeaths)}</td>
								<td>{numberWithCommas(d.recovered)}</td>
								<td>{numberWithCommas(d.active)}</td>
								<td>{numberWithCommas(d.critical)}</td>
								<td>{numberWithCommas(d.tests)}</td>
								<td>{numberWithCommas(d.population)}</td>
							</tr>) : <Spinner />
					}
				</tbody>
			</table>
		</Fragment >
	)
}

export default Continent;
