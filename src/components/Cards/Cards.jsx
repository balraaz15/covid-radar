import React, { useState } from 'react';
import { Spinner, Button, Icon } from '@blueprintjs/core';

import DataCard from '../DataCard/DataCard';
import styles from './Cards.module.css';

const Cards = props => {

	const [showMore, setShowMore] = useState(false);

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
	const dataInitial = [...data].filter((item, index) => index < 5);
	const dataFull = [...data].filter((item, index) => index >= 5);

	const showMoreData = () => {
		setShowMore(!showMore);
	}


	return (
		<div className={styles.Container}>
			<div className={styles.Cards}>
				{
					dataInitial.map(d => <DataCard key={dataInitial.indexOf(d)} data={props.data[d]} title={d.toString()} />)
				}
				{
					showMore ?
						dataFull.map(d => <DataCard key={dataFull.indexOf(d)} data={props.data[d]} title={d.toString()} />)
						: null
				}

			</div>
			<p className={styles.date}>
				<em>Updated: <strong>{updatedDate}</strong> (at <strong>{updatedTime}</strong> {timeZone} Time)</em>
			</p>
			<p>
				<Button className="bp3-intent-success" onClick={showMoreData}>
					{
						showMore ? 'Show Less Data' : 'Show More Data'
					}
					<Icon icon={showMore ? "circle-arrow-up" : "circle-arrow-down"} className={styles.icon}></Icon>
				</Button>
			</p>
		</div>
	)
}

export default Cards;
