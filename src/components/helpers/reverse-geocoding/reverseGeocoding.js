import axios from 'axios';
import { locationIQApiKey } from '../../../config';

const options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0
};

const success = async (pos) => {
	const lat = pos.coords.latitude;
	const lon = pos.coords.longitude;
	// const accuracy = pos.coords.accuracy;

	try {
		const reverseGeoCoded = await axios.get(`https://us1.locationiq.com/v1/reverse.php?key=${locationIQApiKey}&lat=${lat}&lon=${lon}&format=json`);
		localStorage.setItem('myCountry', reverseGeoCoded.data.address.country);
	} catch (error) {
		try {
			console.warn('Cannot connect to the datapoint. Connecting to next datapoint ...');
			const reverseGeoCoded = await axios.get(`https://eu1.locationiq.com/v1/reverse.php?key=${locationIQApiKey}&lat=${lat}&lon=${lon}&format=json`);
			localStorage.setItem('myCountry', reverseGeoCoded.data.address.country);
		} catch (error) {
			console.log(error);
			alert('Could not connect to any datapoints. Please try again some time later.');
		}
	}

}

function error(err) {
	console.warn(`ERROR(${err.code}): ${err.message}`);
}

export const getCountry = () => {
	navigator.geolocation.getCurrentPosition(success, error, options);
}
