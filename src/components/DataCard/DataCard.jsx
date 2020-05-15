import React from 'react';
import CountUp from 'react-countup';
import cx from 'classnames';

import { Card, Elevation } from "@blueprintjs/core";
import styles from './DataCard.module.css';

const DataCard = props => {
	let title = props.title;
	if (props.title === 'todayCases') {
		title = 'Cases Today';
	}
	if (props.title === 'todayDeaths') {
		title = 'Deaths Today';
	}
	return (
		<Card interactive={true} elevation={Elevation.TWO} className={cx(styles.Card, styles[props.title])}>
			<h3 className={styles.title}>{title}</h3>
			<h2 className={styles.data}>
				{(props.title === 'todayCases' || props.title === 'todayDeaths') && props.data ? '+' : ''}<CountUp start={0} end={props.data} duration={2} separator="," />
			</h2>
		</Card>
	)
}

export default DataCard;
