import axios from 'axios';

const apiUrl = 'https://corona.lmao.ninja/v2/';

/**
 * response = active, affectedCountries, cases, casesPerOneMillion, critical, deaths, deathsPerOneMillion, recovered, tests, testsPerOneMillion, todayCases, todayDeaths, updated
 */
export const getLatestData = async (country) => {
	let modifiedUrl = `${apiUrl}all`;;

	if (country) {
		if (country === "All") {
			modifiedUrl = `${apiUrl}all`;
		} else {
			modifiedUrl = `${apiUrl}countries/${country}`;
		}
	}

	try {
		const { data: { cases, deaths, recovered, todayCases, todayDeaths, active, critical, tests, affectedCountries, updated } } = await axios.get(`${modifiedUrl}`);
		return { cases, deaths, recovered, todayCases, todayDeaths, active, critical, tests, affectedCountries, updated };
	} catch (error) {
		console.log(error);
	}
}

export const getHistoricalData = async (lastDays = 30) => {
	try {
		const { data: { cases, deaths, recovered } } = await axios.get(`${apiUrl}historical/all?lastdays=${lastDays}`);
		return { cases, deaths, recovered };
	} catch (error) {
		console.log(error);
	}
}

export const getCountries = async () => {
	try {
		const response = await axios.get(`${apiUrl}countries`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
}

export const getCountriesHistoricalData = async (country, lastDays = 30) => {
	try {
		const response = await axios.get(`${apiUrl}historical/${country}?lastdays=${lastDays}`);
		return response.data.timeline;
	} catch (error) {
		console.log(error);
	}
}
