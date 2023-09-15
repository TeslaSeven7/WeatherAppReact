import React, { useState, useEffect, useRef } from 'react';
import ItemTemps from './ItemTemps.js';
import ItemAir from './ItemAir.js';
import ItemChart from './ItemChart.js';
import ItemTomorrow from './ItemTomorrow.js';
import ItemDetailsRight from './ItemDetailsRight.js';
import ItemGlobe from './ItemGlobe.js';

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { FaSearch } from 'react-icons/fa';
import { TiWeatherWindyCloudy } from 'react-icons/ti';

let autoComplete;

const loadScript = (url, callback) => {
	let script = document.createElement('script');
	script.type = 'text/javascript';

	if (script.readyState) {
		script.onreadystatechange = function () {
			if (script.readyState === 'loaded' || script.readyState === 'complete') {
				script.onreadystatechange = null;
				callback();
			}
		};
	} else {
		script.onload = () => callback();
	}

	script.src = url;
	document.getElementsByTagName('head')[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
	autoComplete = new window.google.maps.places.Autocomplete(
		autoCompleteRef.current,
		{ types: ['(cities)'] }
	);

	autoComplete.setFields([
		'address_components',
		'formatted_address',
		'geometry',
		'photos',
	]);
	autoComplete.addListener('place_changed', () =>
		handlePlaceSelect(updateQuery)
	);
}

async function handlePlaceSelect(updateQuery) {
	const addressObject = autoComplete.getPlace();
	const query = addressObject;
	updateQuery(query);
}

function SearchLocationInput() {
	function error() {
		console.log('Unable to retrieve your location');
	}
	const [query, setQuery] = useState('');
	const autoCompleteRef = useRef(null);
	const [data, setData] = useState([]);
	const [stateInput, setStateInput] = useState('');

	const [resultVille, setResultVille] = useState('');

	const [location, setLocation] = useState(null);

	const [airQuality, setAirQuality] = useState([]);

	const [resultTargetHour, setResultTargetHour] = useState('');
	const [resultTargetHourMin, setResultTargetHourMin] = useState('');
	const [resultTargetHourMax, setResultTargetHourMax] = useState('');
	const [apiData, setApiData] = useState([]);
	useEffect(() => {
		loadScript(
			`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACE_KEY}`,
			() => handleScriptLoad(setQuery, autoCompleteRef)
		);
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(success, error);
		} else {
			console.log('Geolocation not supported');
		}
		loadScript(
			`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACE_KEY}`,
			() => handleScriptLoad(setQuery, autoCompleteRef)
		);
	}, []);
	useEffect(() => {
		if (apiData != '') {
			console.log(apiData);
		}
	}, [apiData, airQuality]);

	const getDays = () => {
		let day = new Date();
		let week = [
			'Dimanche',
			'Lundi',
			'Mardi',
			'Mercredi',
			'Jeudi',
			'Vendredi',
			'Samedi',
		];
		const dateJ1 = week[day.getDay()];
		const dateJ2 = week[(day.getDay() + 1) % 7];
		const dateJ3 = week[(day.getDay() + 2) % 7];
		const semaine = [dateJ1, dateJ2, dateJ3];
		return semaine;
	};

	function success(position) {
		globalApiCalls(position, 0);
	}
	function error() {
		globalApiCalls('Paris, France', 1);
	}

	function globalApiCalls(position, errorMarker) {
		if (errorMarker === 0) {
			let latitude = '';
			let longitude = '';
			if (position.coords) {
				console.log(position);
				latitude = position.coords.latitude;
				longitude = position.coords.longitude;
			} else if (position.hasOwnProperty('formatted_address')) {
				console.log(position);
				latitude = query.geometry.location.lat();
				longitude = query.geometry.location.lng();
			}
			setLocation({ latitude, longitude });
			axios
				.all([
					axios.get('https://api.openweathermap.org/data/2.5/forecast?', {
						params: {
							lat: latitude,
							lon: longitude,
							appid: process.env.REACT_APP_WEATHER_KEY,
							units: 'metric',
							lang: 'fr',
						},
					}),
					axios.get('http://api.openweathermap.org/data/2.5/air_pollution', {
						params: {
							lat: latitude,
							lon: longitude,
							appid: process.env.REACT_APP_WEATHER_KEY,
							units: 'metric',
							lang: 'fr',
						},
					}),
				])
				.then(
					axios.spread((firstResponse, secondResponse) => {
						const data = firstResponse.data;
						setAirQuality(secondResponse.data.list[0].main.aqi);
						const newData = {};
						// Define an array of keys you want to include
						const keysToInclude = ['city', 'cod', 'cnt', 'list'];

						// Define an array of keys you want to filter in the 'list' entries
						const keysToFilter = [
							'clouds',
							'dt_txt',
							'main',
							'visibility',
							'weather',
							'wind',
						];

						// Loop through the keys in response.data
						for (const key in data) {
							if (data.hasOwnProperty(key) && keysToInclude.includes(key)) {
								// Include the key and its value in newData
								if (key === 'list' && Array.isArray(data[key])) {
									// For the 'list' key, include only the first two entries
									newData[key] = data[key].slice(0, 3).map((entry) => {
										// Filter and include only keys that are in keysToFilter
										const filteredEntry = {};
										for (const entryKey in entry) {
											if (
												entry.hasOwnProperty(entryKey) &&
												keysToFilter.includes(entryKey)
											) {
												filteredEntry[entryKey] = entry[entryKey];
											}
										}
										return filteredEntry;
									});
								} else {
									// For other keys, include the entire value
									newData[key] = data[key];
								}
							}
						}
						//Set the new object as the state
						setApiData(newData);

						getTargetedTime(data.city.timezone);
						const hourMin = getTime(data.city.sunrise, data.city.timezone);
						setResultTargetHourMin(hourMin);
						const hourMax = getTime(data.city.sunset, data.city.timezone);
						setResultTargetHourMax(hourMax);

						setData(data.list[0]);

						setResultVille(data.city.name + ', ' + data.city.country);
					})
				)
				.catch((error) => {
					console.error(error);
				});
		} else if (errorMarker === 1) {
			console.log('non');
			axios
				.get('https://api.openweathermap.org/data/2.5/forecast?', {
					params: {
						q: position,
						appid: process.env.REACT_APP_WEATHER_KEY,
						units: 'metric',
						lang: 'fr',
					},
				})
				.then((response) => {
					//get offset from utc time
					const data = response.data;

					const newData = {};
					// Define an array of keys you want to include
					const keysToInclude = ['city', 'cod', 'cnt', 'list'];

					// Define an array of keys you want to filter in the 'list' entries
					const keysToFilter = [
						'clouds',
						'dt_txt',
						'main',
						'visibility',
						'weather',
						'wind',
					];

					// Loop through the keys in response.data
					for (const key in data) {
						if (data.hasOwnProperty(key) && keysToInclude.includes(key)) {
							// Include the key and its value in newData
							if (key === 'list' && Array.isArray(data[key])) {
								// For the 'list' key, include only the first two entries
								newData[key] = data[key].slice(0, 3).map((entry) => {
									// Filter and include only keys that are in keysToFilter
									const filteredEntry = {};
									for (const entryKey in entry) {
										if (
											entry.hasOwnProperty(entryKey) &&
											keysToFilter.includes(entryKey)
										) {
											filteredEntry[entryKey] = entry[entryKey];
										}
									}
									return filteredEntry;
								});
							} else {
								// For other keys, include the entire value
								newData[key] = data[key];
							}
						}
					}
					//Set the new object as the state
					newData.city.name = position;
					setApiData(newData);

					getTargetedTime(data.city.timezone);
					const hourMin = getTime(data.city.sunrise, data.city.timezone);
					setResultTargetHourMin(hourMin);

					const hourMax = getTime(data.city.sunset, data.city.timezone);
					setResultTargetHourMax(hourMax);

					setData(data.list[0]);
					setResultVille(position);
				})
				.catch((error) => {
					console.error(error);
				});

			//! AIR QUALITY
			axios
				.get('http://api.openweathermap.org/data/2.5/air_pollution', {
					params: {
						q: 'Paris, France',
						appid: process.env.REACT_APP_WEATHER_KEY,
						units: 'metric',
						lang: 'fr',
					},
				})
				.then((response) => {
					const data = response.data;
					setAirQuality(data.list[0].main.aqi);
				})
				.catch((error_quality) => {
					console.error(error_quality);
				});
		}
	}

	function getTargetedTime(timeShift) {
		var secTime = timeShift;
		var datesec = new Date(secTime * 1000).toISOString().slice(11, 19);
		var now = new Date();

		//get utc time
		const hours = now.getUTCHours();
		const minutes = now.getUTCMinutes();
		const seconds = now.getUTCSeconds();
		var utcTime = hours + ':' + minutes + ':' + seconds;
		var loctime = addTimes(utcTime, datesec);
		setResultTargetHour(loctime);
	}

	// Convert a time in hh:mm format to minutes
	function timeToMins(time) {
		var b = time.split(':');
		return b[0] * 60 + +b[1];
	}

	// Convert minutes to a time in format hh:mm
	// Returned value is in range 00  to 24 hrs
	function timeFromMins(mins) {
		function z(n) {
			return (n < 10 ? '0' : '') + n;
		}
		var h = ((mins / 60) | 0) % 24;
		var m = mins % 60;
		return z(h) + ':' + z(m);
	}

	// Add two times in hh:mm format
	function addTimes(t0, t1) {
		return timeFromMins(timeToMins(t0) + timeToMins(t1));
	}
	const linkedInput = (e) => {
		setStateInput(e);
	};
	function getTime(timeHHMM, timezone) {
		var sum = timeHHMM + timezone;
		const newDateSum = new Date(sum * 1000).toISOString().substring(11, 16);
		return newDateSum;
	}

	const searchInputApiCall = (e) => {
		e.preventDefault();
		globalApiCalls(query, 0);
	};

	return (
		<div className='content-section'>
			<div className='result-weather rounded-4'>
				<div className='row'>
					<div className='col-12 col-xl-8 left-col px-4 px-md-5'>
						<div className='nav-bar-top'>
							<div className='row'>
								<div className='col-lg-6 text-start'>
									<a
										href='#'
										className='nav-logo'>
										<TiWeatherWindyCloudy />
										TIweather
									</a>
								</div>
								<div className='col-lg-6 pe-0'>
									<form onSubmit={(e) => searchInputApiCall(e)}>
										<div className='search-location-input'>
											<input
												className='rounded-2'
												ref={autoCompleteRef}
												onChange={(event) => setQuery(event.target.value)}
												placeholder='Enter a City'
												onInput={(e) => linkedInput(e.target.value)}
											/>
											<button className='rounded-2'>
												<FaSearch />
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>

						{/* <Navigatore /> */}
						<div className='row mb-xl-0 mb-5'>
							<div className='col-lg-6 col-md-7 mb-3 mb-md-0'>
								<ItemTemps
									key={'Main results'}
									objQuery={apiData}
								/>
							</div>
							<div className='col-lg-6 col-md-5 '>
								<ItemAir
									key={'Air quality'}
									airQuality={airQuality}
								/>
							</div>
							<div className='col-lg-8 mt-3'>
								{apiData?.list ? (
									<ItemChart
										key={'Chart of previsions'}
										objQuery={apiData}
										semaine={getDays()}
									/>
								) : (
									<></>
								)}
							</div>
							<div className='col-lg-4 mt-3'>
								{apiData?.list ? (
									<ItemTomorrow
										key={'tomorrow predictions'}
										ville={apiData.city.name}
										meteoJ2={apiData.list[1].weather[0].description}
										degreesJ2={apiData.list[1].main.temp}
									/>
								) : (
									<></>
								)}
							</div>
						</div>
					</div>

					<div className='col-12 col-xl-4 p-0'>
						{apiData?.list ? (
							<ItemDetailsRight
								key={'item details right'}
								ville={resultVille}
								wind={apiData.list[0].wind}
								tempsJ1={apiData.list[0].main.temp}
								meteoJ1={apiData.list[0].weather[0].description}
								heure={resultTargetHour}
								hourMin={resultTargetHourMin}
								hourMax={resultTargetHourMax}
							/>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SearchLocationInput;
