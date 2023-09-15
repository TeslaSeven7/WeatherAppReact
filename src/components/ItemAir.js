import { FiWind } from 'react-icons/fi';

export default function ItemAir(props) {
	let aqi = '';
	let airClass = '';
	if (props.airQuality) {
		if (props.airQuality <= 3) {
			aqi = '0~50';
			airClass = 'wg-10';
		} else if (props.airQuality > 3 && props.airQuality < 7) {
			aqi = '50~100';
			airClass = 'wg-50';
		} else {
			aqi = '100+';
			airClass = 'wg-100';
		}
	}
	return (
		<div className='card rounded-5 p-3 h-100'>
			<div className='card-body'>
				<div className='card-head'>
					<div className='card-icon rounded-circle'>
						<FiWind />
					</div>
					<div className='ms-3 text-start'>
						<h5 className='card-title'>Qualité de l'air</h5>
						<h6 className='card-subtitle mb-2 text-muted'>Aujourd'hui</h6>
					</div>
				</div>
				<div className='card-weather mt-5'>
					<div className='degrees d-flex align-items-center'>
						<h4 className='h1'> {aqi}</h4>
						<span className='badge rounded-3 py-2 px-3 ms-3 bg-o'>AQI</span>
						<p></p>
					</div>
					<p></p>
				</div>
				<div className='card-badges d-flex align-items-start justify-content-between flex-row mt-5'>
					<div className={airClass + ' badge-long rounded-4 px-4 py-3'}>
						<div className='badge-long-group-title mb-2'>
							<div className='badge-long-title rounded-2 px-3 py-2'>Bon</div>
							<div className='badge-long-title rounded-2 px-3 py-2'>Medium</div>
							<div className='badge-long-title rounded-2 px-3 py-2'>
								Mauvais
							</div>
						</div>
						<div className='gage rounded-4'></div>
					</div>
				</div>
			</div>
		</div>
	);
}
/*AIzaSyCPZR9qmY-UIY4X7zZPS3t6mhpKGJNeTv8*/
