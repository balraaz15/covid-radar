import React, { Component } from 'react';
import Chart from "react-apexcharts";

import { getHistoricalData } from '../../api/api';
import { AppToaster } from '../helpers/toaster/toaster';
import styles from './Graph.module.css';

class Graph extends Component {
	state = {
		historicalData: {},
	}

	async componentDidMount() {
		const data = await getHistoricalData(30);
		this.setState({ historicalData: data });
		this.setGraphData();
	}

	setGraphData = () => {
		if (this.state.historicalData.cases !== undefined) {
			const coval = Object.keys(this.state.historicalData.cases);
			const csval = Object.values(this.state.historicalData.cases);
			this.setState({ co: coval });
			this.setState({ cs: csval });
		}
		if (this.state.historicalData.recovered !== undefined) {
			const rsval = Object.values(this.state.historicalData.recovered);
			this.setState({ rs: rsval });
		}
		if (this.state.historicalData.deaths !== undefined) {
			const dsval = Object.values(this.state.historicalData.deaths);
			this.setState({ ds: dsval });
		}
	}

	drawGraph = (type) => {
		const co = this.state.historicalData.cases ? Object.keys(this.state.historicalData.cases) : [];
		const cs = this.state.historicalData.cases ? Object.values(this.state.historicalData.cases) : [0];
		const rs = this.state.historicalData.recovered ? Object.values(this.state.historicalData.recovered) : [0];
		const ds = this.state.historicalData.deaths ? Object.values(this.state.historicalData.deaths) : [0];

		let cntrc, cntrr, cntrd;
		if (this.props.data) {
			cntrc = this.props.data.cases ? Object.values(this.props.data.cases) : 'No data available';
			cntrr = this.props.data.recovered ? Object.values(this.props.data.recovered) : 'No Data Available';
			cntrd = this.props.data.deaths ? Object.values(this.props.data.deaths) : 'No Data Available';
		}

		const formattedDate = co.map(opt => {
			const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			const a = opt.slice(0, -3).split('/');
			return `${months[Number(a[0]) - 1]} ${a[1]}`
		});
		let options, series;
		if (type === 'area') {
			options = {
				chart: { height: 350, type: 'area' },
				dataLabels: { enabled: false },
				stroke: { curve: 'smooth' },
				xaxis: { type: 'date', categories: formattedDate },
				tooltip: {
					followCursor: true,
				},
				responsive: [{
					breakpoint: 600,
					options: {
						xaxis: {
							labels: {
								show: false
							}
						},
						yaxis: {
							labels: {
								show: false
							}
						}
					},
				}]
			};

			series = [
				{ name: 'Cases', data: cs },
				{ name: 'Recovered', data: rs },
				{ name: 'Deaths', data: ds }
			];
		} else {
			series = [
				{ name: 'Cases', data: cntrc },
				{ name: 'Recovered', data: cntrr },
				{ name: 'Deaths', data: cntrd }
			];

			options = {
				chart: { type: 'bar', height: 350 },
				plotOptions: {
					bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' },
				},
				dataLabels: { enabled: false },
				stroke: { show: true, width: 2, colors: ['transparent'] },
				xaxis: { categories: formattedDate },
				fill: { opacity: 1 },
				tooltip: {
					followCursor: true,
				},
				responsive: [{
					breakpoint: 600,
					options: {
						xaxis: {
							labels: {
								show: false
							}
						},
						yaxis: {
							labels: {
								show: false
							}
						}
					},
				}]
			};
		}

		return (
			<Chart
				className={styles.graph}
				options={options}
				series={series}
				type={type}
				height="500"
			/>
		)
	}

	showToast = (msg) => {
		AppToaster.show({ message: msg, intent: "warning", icon: "info-sign" });
	}

	render() {
		return (
			<div className={styles.graphContainer}>
				<h2 className={styles.title}>Data from last 30 days</h2>
				{
					!this.props.country ? this.drawGraph('area') : this.props.data ? this.drawGraph('bar') : this.showToast(`Oops! We are unable to fetch any historical data for that country/territory.`)}
			</div>
		)
	}
}

export default Graph;
