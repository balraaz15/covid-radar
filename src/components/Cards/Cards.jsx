import React from 'react';
import { Spinner } from '@blueprintjs/core';

import DataCard from '../DataCard/DataCard';
import styles from './Cards.module.css';

const Cards = props => {
	if (!props.data.cases) {
		return <Spinner size={70} intent={"warning"} />;
	}

	const lastUpdated = new Date(props.data.updated);
	const updatedDate = lastUpdated.toDateString();
	const timeZoneRaw = Intl.DateTimeFormat(lastUpdated).resolvedOptions().timeZone;
	const timeZone = timeZoneRaw.split("/")[1];
	const hours = lastUpdated.getHours();
	const mins = lastUpdated.getMinutes();
	const updatedTime = `${hours}:${mins}`;

	let data = Object.keys(props.data);
	data.pop();


	return (
		<div>
			<div className={styles.Cards}>
				{
					data.map(d => <DataCard key={data.indexOf(d)} data={props.data[d]} title={d.toString()} />)
				}

			</div>
			<p className={styles.date}>
				<em>Updated: <strong>{updatedDate}</strong> (at <strong>{updatedTime}</strong> {timeZone} Time)</em>
			</p>
		</div>
	)
}

export default Cards;
