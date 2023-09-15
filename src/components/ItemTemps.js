import { BsCloudSun } from 'react-icons/bs';

export default function ItemTemps(props) {
	let degrees = '';
	let degreesMin = '';
	let meteo = '';
	let pressure = '';
	let visibility = '';
	let humidity = '';
	if (props.objQuery?.list) {
		degrees = props.objQuery.list[0].main.temp;
		degreesMin = props.objQuery.list[0].main.temp_min;
		meteo = props.objQuery.list[0].weather[0].description;
		pressure = props.objQuery.list[0].main.pressure;
		visibility = props.objQuery.list[0].visibility / 1000;
		humidity = props.objQuery.list[0].main.humidity;
	}
	return (
		<div className='card rounded-5 p-3'>
			<div className='card-body'>
				<div className='card-head'>
					<div className='card-icon rounded-circle'>
						<BsCloudSun />
					</div>
					<div className='ms-3 text-start'>
						<h5 className='card-title'>Quel temps fait-il ?</h5>
						<h6 className='card-subtitle mb-2 text-muted'>Aujourd'hui</h6>
					</div>
				</div>
				<div className='card-weather mt-5'>
					<div className='degrees d-flex align-items-center'>
						<h4 className='h1'>{degrees}°C</h4>
						<span className='badge rounded-2 ms-3 py-2 px-3 bg-v'>
							{degreesMin}°C
						</span>
					</div>
					<p>{meteo}</p>
				</div>
				<div className='card-badges mt-5 d-flex align-items-start justify-content-between flex-sm-row flex-column gap-2 gap-md-2 gap-lg-2 gap-xl-4'>
					<div className='badge-1 p-3 rounded-4 mb-3 mb-xl-0 w-100 mr-0 mr-xl-3'>
						<p>Pression</p>
						<span>{pressure} hPa</span>
					</div>
					<div className='badge-2 p-3 rounded-4 mb-3 mb-xl-0 w-100'>
						<p>Visibilité</p>
						<span>{visibility} Km</span>
					</div>
					<div className='badge-3 p-3 rounded-4 mb-3 mb-xl-0 w-100'>
						<p>Humidité</p>
						<span>{humidity} %</span>
					</div>
				</div>
			</div>
		</div>
	);
}
/*AIzaSyCPZR9qmY-UIY4X7zZPS3t6mhpKGJNeTv8*/
